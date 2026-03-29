/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", function(event: PushEvent) {
  if (!event.data) return;

  let data: any = {};
  try {
    data = event.data.json();
  } catch (e) {
    return;
  }

  const allowedTypes = ["created", "reminder", "start"];

  
  if (!allowedTypes.includes(data.type) || data.table !== "my_events") {
    return;
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "Nutsa Bakhtadze", {
      body: data.body || "",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-96x96.png",
      tag: data.type, 
      data: { url: data.url || "/" }
    } as NotificationOptions)
  );
});

self.addEventListener("notificationclick", function(event: NotificationEvent) {
  event.notification.close();
  var url = event.notification.data && event.notification.data.url
    ? event.notification.data.url : "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(function(list: readonly WindowClient[]) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].url.indexOf(self.location.origin) !== -1 && "focus" in list[i]) {
            list[i].navigate(url);
            return list[i].focus();
          }
        }
        return self.clients.openWindow(url);
      })
  );
});