import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="px-6 py-16 text-gray-800 md:px-20 bg-gray-50">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Get in Touch</h1>
        <p className="max-w-2xl mx-auto text-gray-600">
          Have a question, suggestion, or just want to say hello? We’d love to hear from you. Fill out the form and we’ll get back to you shortly!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form className="p-8 space-y-5 bg-white rounded-lg shadow-md">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Message</label>
            <textarea
              rows={5}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>

        <div className="p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="mt-1 text-xl text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Our Office</h3>
              <p className="text-gray-600">sector 62, noida, India</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="mt-1 text-xl text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="mt-1 text-xl text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">hello123@gmail.com</p>
            </div>
          </div>

          <div className="mt-6">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.28591403221!2d77.34689940319943!3d28.62012561074063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456ef36d9f%3A0x3b7191b1286136c8!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1753947001691!5m2!1sen!2sin"
              width="100%"
              height="200"
              className="border-0 rounded"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;
