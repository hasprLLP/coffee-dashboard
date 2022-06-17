import axios from 'axios'

const sendNotification = (data_, user) => {
  // Loop for all students
  try {
    user.forEach(async token => {
      // Send Photo from FCM Cloud Messaging

      var data = {
        to: token,
        notification: {
          title: data_.title,
          body: data_.body,
          sound: data_.sound || 'notification.wav',
          android_channel_id: 'notification',
          image: data_.image || 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg',
        },
        data: {
          ...data_?.data,
        },
        content_available: true,
        priority: 'high',
      }

      const rawResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer AAAAGQ8bh38:APA91bGZdH4VYrYIo0RQ-MRZtX8R-bEAawMAgEiPLBDnjPEQJT_esTNSvTJp46xElN4h3aakRAy9eVYrddLjo_fu_6BoccS1HshvN7cYZJmGsEAlQ3uwl1qIpit5DHyCRoo2n0QZyZj4',
        },
        body: JSON.stringify(data),
      })
      const content = await rawResponse.json()

      // console.log(content)
    })
  } catch (error) {
    // console.log(error)
  }

  //
}

export default sendNotification
