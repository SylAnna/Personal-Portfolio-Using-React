import { useState, useEffect } from 'react'

import './App.css'
import Nav from './Nav'
import AboutMe from './AboutMe';
import Footer from './Footer';
// TanStack Query import
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


function App() {
  const [theme,setTheme] = useState('');
 

  return (
    <div data-theme={theme} className="min-h-screen flex flex-col">
      <Nav theme={theme} setTheme={setTheme} />
      <main className="flex-1 bg-content-bg">
          <AboutMe />
      </main>

      <Footer />
    </div>
  )
}

export default App
