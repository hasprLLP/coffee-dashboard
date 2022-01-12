// import Login from './login'

// export default function Home() {
//   return (
//     <>
//       <Login />
//     </>
//   )
// }
import dynamic from 'next/dynamic'

const ViewPDF = dynamic(() => import('../pdftest.js'), {
  ssr: false,
})

export default function Home() {
  const data = { name: 'Chamar Lodu', phone: 7987751602 }

  return <ViewPDF data={data} />
}
