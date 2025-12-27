'use client'
import React, { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';

interface PetFormData {
    petName: string;
    petSpecies: string;
    petGender: string;
    petBreed: string;
    petAgeYears: string;
    petAgeMonths: string;
    petAgeDays: string;
    petDOB: string;
    microchipNumber: string;
    vaccinationId: string;
    petColor: string;
    petWeight: string;
    ownerName: string;
    ownerEmail: string;
    mobileNumber: string;
    whatsappNumber: string;
    ownerAddress: string;
    petNotes: string;
}

export default function PetClinicForm({ initialData }: { initialData: PetFormData }) {
    const [formData, setFormData] = useState<PetFormData>({
        petName: '',
        petSpecies: '',
        petGender: '',
        petBreed: '',
        petAgeYears: '',
        petAgeMonths: '',
        petAgeDays: '',
        petDOB: '',
        microchipNumber: '',
        vaccinationId: '',
        petColor: '',
        petWeight: '',
        ownerName: '',
        ownerEmail: '',
        mobileNumber: '',
        whatsappNumber: '',
        ownerAddress: '',
        petNotes: ''
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

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Pet registration submitted successfully!');
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
                                    name="petName"
                                    value={formData.petName}
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
                                    name="petSpecies"
                                    value={formData.petSpecies}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Species</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Bird">Bird</option>
                                    <option value="Rabbit">Rabbit</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Gender *
                                </label>
                                <select
                                    name="petGender"
                                    value={formData.petGender}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Breed
                                </label>
                                <input
                                    type="text"
                                    name="petBreed"
                                    value={formData.petBreed}
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
                                    name="petDOB"
                                    value={formData.petDOB}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Age
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <input
                                        type="number"
                                        name="petAgeYears"
                                        value={formData.petAgeYears}
                                        onChange={handleChange}
                                        placeholder="Years"
                                        min="0"
                                        className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                    />
                                    <input
                                        type="number"
                                        name="petAgeMonths"
                                        value={formData.petAgeMonths}
                                        onChange={handleChange}
                                        placeholder="Months"
                                        min="0"
                                        max="11"
                                        className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                    />
                                    <input
                                        type="number"
                                        name="petAgeDays"
                                        value={formData.petAgeDays}
                                        onChange={handleChange}
                                        placeholder="Days"
                                        min="0"
                                        max="30"
                                        className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                    />
                                </div>
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
                                    name="ownerName"
                                    value={formData.ownerName}
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
                                    name="ownerEmail"
                                    value={formData.ownerEmail}
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
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    WhatsApp Number
                                </label>
                                <input
                                    type="tel"
                                    name="whatsappNumber"
                                    value={formData.whatsappNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Address *
                                </label>
                                <textarea
                                    name="ownerAddress"
                                    value={formData.ownerAddress}
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