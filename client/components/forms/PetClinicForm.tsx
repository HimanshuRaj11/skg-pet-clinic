'use client'
import React, { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import axios from 'axios';

export interface PetFormData {
    id?: string;
    pet_name: string;
    species: string;
    gender: string;
    breed: string;
    date_of_birth: string;
    microchipNumber: string;
    vaccinationId: string;
    petColor: string;
    petWeight: string;
    owner_name: string;
    owner_email: string;
    owner_phone: string;
    owner_address: string;
    medical_notes: string;
    created_at?: string;
}

export default function PetClinicForm() {
    const [formData, setFormData] = useState<PetFormData>({
        pet_name: '',
        species: '',
        gender: '',
        breed: '',
        date_of_birth: '',
        microchipNumber: '',
        vaccinationId: '',
        petColor: '',
        petWeight: '',
        owner_name: '',
        owner_email: '',
        owner_phone: '',
        // whatsappNumber: '',
        owner_address: '',
        medical_notes: ''
    });

    useEffect(() => {
        // Check system preference on mount
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
        if (!token) {
            throw new Error("No access token found");
        }
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Pet registration submitted successfully!');

        } catch (error) {
            console.log(error);

        }

    };

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <PawPrint className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Pet Registration Form
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    {/* Pet Information Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-blue-600 dark:text-blue-400 border-gray-200 dark:border-gray-700">
                            Pet Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Pet Name *
                                </label>
                                <input
                                    type="text"
                                    name="pet_name"
                                    value={formData.pet_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Species *
                                </label>
                                <select
                                    name="species"
                                    value={formData.species}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Species</option>
                                    <option value="DOG">Dog</option>
                                    <option value="CAT">Cat</option>

                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Gender *
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Breed
                                </label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>



                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    name="petColor"
                                    value={formData.petColor}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    name="petWeight"
                                    value={formData.petWeight}
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Microchip Number
                                </label>
                                <input
                                    type="text"
                                    name="microchipNumber"
                                    value={formData.microchipNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Vaccination ID
                                </label>
                                <input
                                    type="text"
                                    name="vaccinationId"
                                    value={formData.vaccinationId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Owner Information Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-blue-600 dark:text-blue-400 border-gray-200 dark:border-gray-700">
                            Owner Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Owner Name *
                                </label>
                                <input
                                    type="text"
                                    name="owner_name"
                                    value={formData.owner_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="owner_email"
                                    value={formData.owner_email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    name="owner_phone"
                                    value={formData.owner_phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>



                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Address *
                                </label>
                                <textarea
                                    name="owner_address"
                                    value={formData.owner_address}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register Pet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}