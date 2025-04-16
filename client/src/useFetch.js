import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const abortCont = new AbortController()
    const token = localStorage.getItem('token')

      fetch(url, {
        signal: abortCont.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          // console.log(res)
          if (!res.ok) {
            throw Error('Failed to fetch the data')
          }
          return res.json()
        })
        .then((data) => {
          // console.log(data)
          setData(data)
          setIsLoading(false)
          setError(null)
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            setIsLoading(false)
            // console.log(err.message)
            setError(err)
          }
        })
    // }, 1000)

    return () => {
        // clearTimeout(timer)
        abortCont.abort()
    }
  }, [url])

  return { data, error, isLoading }
}

export default useFetch
