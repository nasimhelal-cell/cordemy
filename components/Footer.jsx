const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-black text-gray-400 bottom-0 py-10 text-lg font-semibold">
      <p>&copy; {new Date().getFullYear()}, Cordemy, All rights reserved</p>
    </div>
  );
};

export default Footer;
