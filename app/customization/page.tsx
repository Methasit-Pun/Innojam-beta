import Link from 'next/link'

export default function Customization() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Project Customization</h1>
      <p className="text-xl text-white mb-8">Here you can implement your project customization tools.</p>
      <Link href="/" className="text-xl px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-all duration-300">
        Back to Home
      </Link>
    </div>
  )
}

