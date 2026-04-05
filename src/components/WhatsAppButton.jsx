function WhatsAppButton() {
  const phoneNumber = "919861955811";

  const handleClick = () => {
    const message = "Hello, I want to know more about your products";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-110 transition"
    >
      💬
    </button>
  );
}

export default WhatsAppButton;