chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

// Alert of upcoming pending tasks
// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name.startsWith("todo-alert-")) {
//     chrome.notifications.create({
//       type: "basic",
//       iconUrl: "vite.svg",
//       title: "Upcoming Task!",
//       message: `You have a task due soon.`,
//     });
//   }
// });
