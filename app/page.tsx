'use client'

import { useSearchParams } from 'next/navigation'
import { MainPage } from './components/MainPage'

export default function Home() {
  const searchParams = useSearchParams()
  const refine = searchParams.get('refine') === 'true'

  return <MainPage refine={refine} />
}

