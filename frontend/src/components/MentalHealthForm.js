import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMood, setStress, setFeelings, createHealthStatus, fetchHealthStatus } from '../redux/healthSlice';
import DataTable from 'react-data-table-component';
import Logout from './Logout';

const MentalHealthForm = () => {
    const dispatch = useDispatch();
    const { moodRating, stressLevel, feelings, loading, error, healthStatuses } = useSelector((state) => state.health);

    useEffect(() => {
        dispatch(fetchHealthStatus());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkInData = {
            moodRating,
            stressLevel,
            feelings,
        };
        dispatch(createHealthStatus(checkInData));
        dispatch(fetchHealthStatus());
    };

    const columns = [
        {
            name: 'ID',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'Mood Rating',
            selector: row => row.moodRating,
            sortable: true,
        },
        {
            name: 'Stress Level',
            selector: row => row.stressLevel,
            sortable: true,
        },
        {
            name: 'Feelings',
            selector: row => row.feelings,
        },
        {
            name: 'Date',
            selector: row => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
    ];

    return (
        <div className="container-fluid mt-5" style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '-40px',
                right: '5px',
            }}>
                <Logout />
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="card shadow-lg p-4 flex-fill mb-4 mb-md-0">
                    <h2 className="mb-4 text-center text-primary">Daily Mental Health Check-In</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="mood" className="form-label">Mood Rating (1-10)</label>
                            <input
                                type="range"
                                id="mood"
                                min="1"
                                max="10"
                                value={moodRating}
                                onChange={(e) => dispatch(setMood(e.target.value))}
                                className="form-range"
                                required
                            />
                            <div className="text-center mt-2">{moodRating}</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stress" className="form-label">Stress Level (1-10)</label>
                            <input
                                type="range"
                                id="stress"
                                min="1"
                                max="10"
                                value={stressLevel}
                                onChange={(e) => dispatch(setStress(e.target.value))}
                                className="form-range"
                                required
                            />
                            <div className="text-center mt-2">{stressLevel}</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="feelings" className="form-label">How are you feeling today?</label>
                            <textarea
                                id="feelings"
                                className="form-control"
                                rows="4"
                                value={feelings}
                                required
                                onChange={(e) => dispatch(setFeelings(e.target.value))}
                                placeholder="Write about your feelings..."
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Check-In'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="card shadow-lg p-4 ms-md-4 flex-fill" style={{ maxWidth: '700px' }}>
                    <h2 className="mb-4 text-center text-primary">Previous Check-Ins</h2>
                    <DataTable
                        columns={columns}
                        data={healthStatuses?.data || []}
                        pagination
                        responsive
                        highlightOnHover
                        striped
                        dense
                        noDataComponent="No check-ins available."
                    />
                </div>
            </div>
        </div>
    );
};

export default MentalHealthForm;
