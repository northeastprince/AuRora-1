import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [successful, setSuccessful] = useState(false);

  const [step, setStep] = useState(0);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeState, setZipCodeState] = useState("");
  const { width, height } = useWindowSize()

  const [phone, setPhone] = useState("");
  var zipcodes = require('zipcodes');

  return (
    <>
      <Head>
        <title>Aurora</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          

              <main style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", margin: -8}}>
              <div style={{backgroundColor: "#fff", width: "fit-content", padding: 8, borderRadius: 16, margin: "16"}}>
                <div>
                  <h1 style={{margin: 0, fontSize: 36}}>Aurora</h1>
                  <p style={{fontSize: 18}}>Morning mobile notifications to let you know what<br/> clothes to wear based on the weather in your zip code</p>
                  {successful ? (                  <Confetti
                  style={{height: "100vh", width: "100vw"}}
      width={"1000px"}
      height={"1000px"}
    />) : 
                  (null)}

                </div>
          
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14, margin: 0}}>Zipcode</p>
              <input type="zipcode" placeholder="Zip Code" value={zipCode} onChange={event => {
                setZipCode(event.target.value)
                if(zipcodes?.lookup(event.target.value) != undefined) {
                  setZipCodeState(zipcodes?.lookup(event.target.value))
                } else {
                  setZipCodeState(undefined)
                }
                
              }
            }/>
            <p style={{fontSize: 12, margin: 0}}>{zipCodeState?.city}{zipCodeState?.state != undefined ? (",") : ("")} {zipCodeState?.state}</p>
            </div>
            <div>
            <p style={{fontSize: 14, margin: 0}}>Phone Number</p>
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                style={{width: 212}}
                defaultCountry="US"
                onChange={setPhone}/>
              <button 
                  onClick={() => {
                      console.log({user: {"zip": zipCode, "phone_number": phone}})
                      setSuccessful(true)
                  }}
                  style={{backgroundColor: "#258CD6", color: "#fff", padding: "10px 20px", marginTop: 16, width: "100%", border: "none", borderRadius: "5px", cursor: "pointer"}}
              >
                  Submit
              </button>
          </div>
          <h1></h1>
        </div>
      </main>
    </>
  )
}