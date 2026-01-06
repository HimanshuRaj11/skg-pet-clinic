'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Stethoscope, PawPrint, FileText } from 'lucide-react';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface Pet {
    id: string;
    pet_name: string;
    species: string;
    breed: string;
    age: number;
}

interface Doctor {
    id: string;
    name: string;
    specialization: string;
    available: boolean;
}

interface AppointmentData {
    pet: string;
    reason: string;
    appointment_date?: string;
    appointment_time?: string;
    status: string;
}

const PetClinicAppointment: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [pets, setPets] = useState<Pet[]>([]);

    const fetchPets = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
        if (!token) {
            throw new Error("No access token found");
        }
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPets(data);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchPets();
    }, []);


    const [formData, setFormData] = useState<AppointmentData>({
        pet: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
        status: "SCHEDULED",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
        if (!token) {
            throw new Error("No access token found");
        }


        try {
            // API call to book appointment
            console.log(formData);

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments/`, {
                appointment_date: "2026-01-06",
                appointment_time: "20:25:23.245Z",
                reason: "string",
                status: "SCHEDULED",
                pet: "3"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // if (!response.ok) {
            //     throw new Error('Failed to book appointment');
            // }

            console.log('Appointment booked:', data);

            setSuccess(true);
            setFormData({
                pet: '',
                reason: '',
                appointment_date: '',
                appointment_time: '',
                status: "SCHEDULED",
            });
        } catch (err) {
            console.log(error);

            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // const selectedUser = users.find(u => u.id === formData.userId);
    const selectedPet = pets.find(p => p.id === formData.pet);
    // const selectedDoctor = doctors.find(d => d.id === formData.doctorId);

    return (
        <div className="dark min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <PawPrint className="w-8 h-8 text-blue-400" />
                        <h1 className="text-3xl font-bold text-blue-400">Book Appointment</h1>
                    </div>

                    {success && (
                        <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded mb-6">
                            Appointment booked successfully! We'll send you a confirmation email.
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* User Selection */}
                        {/* <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <User className="w-4 h-4 text-blue-400" />
                                Pet Owner
                            </label>
                            <select
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select pet owner</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} - {user.email}
                                    </option>
                                ))}
                            </select>
                            {selectedUser && (
                                <p className="mt-2 text-sm text-gray-400">Phone: {selectedUser.phone}</p>
                            )}
                        </div> */}

                        {/* Pet Selection */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <PawPrint className="w-4 h-4 text-blue-400" />
                                Pet
                            </label>
                            <select
                                name="pet"
                                value={formData.pet}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select pet</option>
                                {pets.map(pet => (
                                    <option key={pet.id} value={pet.id}>
                                        {pet.pet_name} - {pet.species}
                                    </option>
                                ))}
                            </select>
                            {selectedPet && (
                                <p className="mt-2 text-sm text-gray-400">
                                    {selectedPet.breed}, {selectedPet.age} years old
                                </p>
                            )}
                        </div>

                        {/* Doctor Selection */}
                        {/* <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <Stethoscope className="w-4 h-4 text-blue-400" />
                                Veterinarian
                            </label>
                            <select
                                name="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select veterinarian</option>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id} disabled={!doctor.available}>
                                        {doctor.name} - {doctor.specialization} {!doctor.available && '(Unavailable)'}
                                    </option>
                                ))}
                            </select>
                            {selectedDoctor && (
                                <p className="mt-2 text-sm text-gray-400">
                                    Specialization: {selectedDoctor.specialization}
                                </p>
                            )}
                        </div> */}

                        {/* Date and Time */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="appointment_date"
                                    value={formData.appointment_date}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    Time
                                </label>
                                <input
                                    type="time"
                                    name="appointment_time"
                                    value={formData.appointment_time}
                                    onChange={(e) => {
                                        const time = e.target.value;
                                        setFormData({
                                            ...formData,
                                            appointment_time: time ? `${time}:00.000000` : ''
                                        });
                                    }}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Reason for Visit */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <FileText className="w-4 h-4 text-blue-400" />
                                Reason for Visit
                            </label>
                            <input
                                type="text"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="e.g., Annual checkup, vaccination, illness"
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Additional Notes */}
                        {/* <div>
                            <label className="text-sm font-medium mb-2 block">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Any additional information about your pet's condition or special requirements"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div> */}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            {loading ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetClinicAppointment;