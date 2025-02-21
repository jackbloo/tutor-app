'use client'

type ScheduleEmptyProps ={
    handleToHome: () => void
}

const ScheduleEmpty = ({
    handleToHome
}: ScheduleEmptyProps ) => {
    return(
        <div style={{marginTop: 64}}>
        <div className='font-semibold' style={{fontSize: 24}}>
          {"You'll see your tutors and lesson schedule here"}
        </div>
        <div className='mt-4 text-sm'>
          {"Your lesson schedule is the path to success. Find a tutor and book your first lesson to start"}
        </div>
        <div className='mt-4'>
        <button className=" font-semibold px-6 py-2 rounded-lg w-full" style={{border: '2px solid black', background: '#ff7aac'}} onClick={handleToHome}>Find a tutor</button>
        </div>
      </div>
    )
}

export default ScheduleEmpty