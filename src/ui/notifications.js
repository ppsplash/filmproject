export const createNotification = (msg) => {
  let color = "bg-indigo-700";
  const notificationArea = document.getElementById("notificationArea");
  const notification = document.createElement("div");
  notification.innerHTML = `
    <div class=" text-white ml-5 font-bold px-3 py-2 inline-block text-lg ${color} rounded-md max-w-full mb-2">
      ${msg}
    </div>
  `;
  notificationArea.appendChild(notification);
  setTimeout(() => {
    notificationArea.removeChild(notification);
  }, 3000);
};
