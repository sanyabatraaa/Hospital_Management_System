import AppointmentForm from "../components/AppointmentForm"
import Hero from "../components/Hero"

const Appointment = () => {
  return (
    <>
    <Hero title={"Schedule Your Appointment | ZeeCare Medical Institute"} imageUrl={"/signin.png"}/>
    <AppointmentForm></AppointmentForm>
    </>
  )
}

export default Appointment