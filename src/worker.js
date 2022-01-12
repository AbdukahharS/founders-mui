console.log('Service Worker Loaded')

self.addEventListener('push', (e) => {
  const data = e.data.json()
  console.log('Push recieved')
  self.registration.showNotification(data.title, {
    body: 'Notified by me!',
    icon: 'https://onesignal-blog.s3.amazonaws.com/2017/Jun/Notification_in_Notification_Center-1496789192834.png',
  })
})
