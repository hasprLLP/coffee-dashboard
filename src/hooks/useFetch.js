import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data.data)

const useFetch = path => {
  const { data, error } = useSWR(path, fetcher)

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
export default useFetch
