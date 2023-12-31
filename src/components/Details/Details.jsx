import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import swal from "sweetalert";

function Details() {
  const [data, setData] = useState(0);
  const datas = useLoaderData();
  const { id } = useParams();
  const bookings = [];
  useEffect(() => {
    const service = datas?.find((d) => d.id == id);
    setData(service);
  }, [id, datas]);
  const { title, price, img, desc } = data;

  const handleBooking=()=>{
    const localData = JSON.parse(localStorage.getItem("booked"));
    console.log(localData)
    if (!localData) {
      bookings.push(data);
      localStorage.setItem("booked", JSON.stringify(bookings));
      swal("Thanks for booking!");
    } else {
      const isExits = localData.find((d) => d.id == id);
      if (!isExits) {
        bookings.push(...localData, data);
        localStorage.setItem("booked", JSON.stringify(bookings));
        swal("Thanks for booking!");
      } else {
        swal("Already, You are booked!");
      }
    }
  }
  return (
    <>
      {data && (
        <>
          <div className=" w-4/5 my-6 mx-auto">
            <div>
              <img
                className="w-full h-[300px] lg:h-[500px]"
                src={img}
                alt="Thumbanial"
              />
            </div>
            <div>
              <h1 className=" text-3xl font-bold my-5">{title}</h1>
              <p className="text-2xl font-bold">Price: {price}$</p>
              <div className=" text-lg font-medium">
                <p>{desc.title}</p>
                <p className=" my-3 text-2xl font-semibold">{desc.ptitle}</p>
                <p>{desc.pdesc}</p>
              </div>
            </div>
            <button onClick={handleBooking} className=" bg-blue-500 text-white rounded-md px-4 py-2  my-3 font-bold text-xl">
              Booking Now
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Details;
