import React, { useState } from 'react';

const Base = import.meta.env.BASE_URL;
console.log("Base URL:", Base);// For Testing
const EXTERIOR_VIEWS = [
  { name: 'Front', src: `${Base}images/views/front.jpg` }, //src is under string literal ` ` and not single quotes ''
  { name: 'Rear', src: `${Base}images/views/rear.jpg` },
  { name: 'Left Side', src: `${Base}images/views/left.jpg` },
  { name: 'Right Side', src: `${Base}images/views/right.jpg` },
  { name: 'Top', src: `${Base}images/views/top.jpg` }
];

// import.meta.env.BASE_URL is set by Vite according to your vite.config.js → base: '/my-car-portfolio/'.
// On GitHub Pages your images will be served from:
// https://username.github.io/my-car-portfolio/images/views/front.jpg
// Without backticks, you were literally sending the string "${BASE}images/views/front.jpg" which is invalid.
const INTERIOR_FRAME_COUNT = 12;

export default function CarPortfolio() {
  const [selectedView, setSelectedView] = useState(EXTERIOR_VIEWS[0].src);
  const [interiorFrame, setInteriorFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 15) {
      setInteriorFrame((prev) => (prev + (deltaX > 0 ? 1 : -1) + INTERIOR_FRAME_COUNT) % INTERIOR_FRAME_COUNT);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setDragging(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      alert('Please fill all fields!');
      return;
    }
    alert('Enquiry submitted successfully! (Local only)');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🚗 My Car for Sale</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white rounded-lg shadow p-4 w-full flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Car Details</h2>
          <ul className="space-y-1 flex-1">
            <li><b>Model:</b> Maruti Suzuki</li>
            <li><b>Car Transmission Type:</b> Manual</li>
            <li><b>Body Type:</b> Hatchback</li>
            <li><b>Variant:</b> Celerio VXI CNG</li>
            <li><b>Color:</b> Pearl white</li>
            <li><b>Engine:</b> CNG/Petrol</li>
            <li><b>Insurance:</b> Yes</li>
            <li><b>PUC:</b> Yes</li>
            <li><b>RC:</b> Yes</li>
            <li><b>FastTag:</b> Yes</li>
            <li><b>CNG Fitness Certificate:</b> Yes</li>
            <li><b>Registration Year:</b> 2018</li>
            <li><b>AirBag Fitted:</b> Yes</li>
            <li><b>Power Windows:</b> Yes</li>
            <li><b>Stepny:</b> Yes</li>
            <li><b>Automatic Keys:</b> Yes</li>
            <li><b>Service History Avaialable:</b> Yes</li>
            <li><b>Accidental History:</b> No</li>
            <li><b>Owner Type:</b> First</li>
            <li><b>Kilometers Driven:</b> Less than 25000 kms</li>


          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-4 w-full flex flex-col">


          <div className="flex space-x-2 justify-center flex-wrap mb-4">
            {EXTERIOR_VIEWS.map((view) => (
              <button
                key={view.name}
                onClick={() => setSelectedView(view.src)}
                className="px-4 py-2 border rounded hover:bg-gray-200 text-sm"
              >
                {view.name}
              </button>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={selectedView} alt="Car view" className="max-h-100 w-full object-contain rounded-lg" />
          </div>
        </div>

        {/* <div
          className="relative border rounded-lg shadow-md bg-black flex items-center justify-center h-64"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={`/images/interiors/interior-${interiorFrame}.jpg`}
            alt="Interior 360 view"
            className="max-h-full object-contain"
          />
          <span className="absolute bottom-2 right-2 text-white text-xs">Drag to rotate</span>
        </div> */}

      </div>



      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Contact Owner</h2>
        <p><b>Name:</b> Sainath Dhende</p>
        <p><b>Phone:</b> +91-XXXXXXXXXX</p>
        <p className="text-red-600 font-bold mt-2">⚠️ INDIVIDUAL BUYERS ONLY — NO DEALERS</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Buyer Enquiry Form</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded p-2"
          ></textarea>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
