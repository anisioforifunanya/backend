'use client'
import './onboarding.css'
import useFetchUser from '@/hooks/useFetchUser'

export default function OnboardingLayout({ children }) {
    useFetchUser('user');

    return(<>{children}</>)
}