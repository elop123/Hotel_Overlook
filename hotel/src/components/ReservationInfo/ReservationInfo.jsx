import React from 'react'

export const ReservationInfo = () => {
  return (
    <section>
         <p style={{marginLeft:'7.5rem', fontFamily:'Open Sans' }}>Her kan du ændre og afbestille dine reservationer</p>
         <table style={{ fontFamily:'Open Sans', width: "70%", borderCollapse: "collapse",
                          borderBottom:'1px solid grey', borderTop:'none', marginTop:'1rem',
                          marginLeft:'7.5rem', marginBottom:'2rem' }}>
        <thead>
          <tr style={{ backgroundColor: "lightgrey", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Hotel- og værelsetype
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Dato</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Handling
            </th>
          </tr>
        </thead>     
      </table>
   
    </section>
  )
}
