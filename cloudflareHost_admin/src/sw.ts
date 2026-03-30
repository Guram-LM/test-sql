/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", function(event: PushEvent) {
  if (!event.data) return;
  var data: any = {};
  try { data = event.data.json(); }
  catch(e) { data = { title: "Admin Panel", body: (event.data as any).text() }; }

  event.waitUntil(
    self.registration.showNotification(data.title || "Admin Panel", {
      body: data.body || "",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-96x96.png",
      tag: data.type || "admin",
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