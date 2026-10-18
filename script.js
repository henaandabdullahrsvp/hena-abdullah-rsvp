document.addEventListener(
  "DOMContentLoaded",
  function () {


    // =====================================
    // OPEN INVITATION + MUSIC
    // =====================================

    const openButton =
      document.getElementById(
        "open-invitation"
      );

    const welcomeScreen =
      document.getElementById(
        "welcome-screen"
      );

    const invitationMusic =
      document.getElementById(
        "invitation-music"
      );


    if (
      openButton &&
      welcomeScreen
    ) {

      openButton.addEventListener(
        "click",
        function () {

          welcomeScreen.classList.add(
            "opened"
          );

          document.body.classList.remove(
            "invitation-locked"
          );


          if (invitationMusic) {

            invitationMusic.volume = 0.5;

            invitationMusic
              .play()
              .catch(function () {

                console.log(
                  "Music could not start."
                );

              });

          }


          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

        }
      );

    }



    // =====================================
    // RSVP ELEMENTS
    // =====================================

    const form =
      document.getElementById(
        "rsvp-form"
      );

    const fullName =
      document.getElementById(
        "full-name"
      );

    const guestEmail =
      document.getElementById(
        "guest-email"
      );

    const attendance =
      document.getElementById(
        "attendance"
      );

    const guestCount =
      document.getElementById(
        "guest-count"
      );

    const submitButton =
      document.getElementById(
        "submit-rsvp"
      );

    const rsvpStatus =
      document.getElementById(
        "rsvp-status"
      );

    const thankYouSection =
      document.getElementById(
        "thank-you"
      );

    const thankYouMessage =
      document.getElementById(
        "thank-you-message"
      );



    // =====================================
    // ATTENDANCE DROPDOWN
    // =====================================

    if (
      attendance &&
      guestCount
    ) {

      attendance.addEventListener(
        "change",
        function () {

          if (
            attendance.value === "no"
          ) {

            guestCount.value = "";

            guestCount.required = false;

            guestCount.style.display =
              "none";

          } else {

            guestCount.style.display =
              "";

            guestCount.required = true;

          }

        }
      );

    }



    // =====================================
    // SEND RSVP TO EMAIL
    // =====================================

    if (
      form &&
      fullName &&
      guestEmail &&
      attendance &&
      guestCount
    ) {

      form.addEventListener(
        "submit",
        async function (event) {

          event.preventDefault();


          if (
            attendance.value === "yes" &&
            !guestCount.value
          ) {

            rsvpStatus.textContent =
              "Please select how many people will be attending.";

            return;

          }


          const numberAttending =
            attendance.value === "yes"
              ? guestCount.value
              : "0";


          submitButton.disabled = true;

          submitButton.textContent =
            "Sending...";

          rsvpStatus.textContent =
            "";


          const rsvpData = {

            name:
              fullName.value.trim(),

            email:
              guestEmail.value.trim(),

            attendance:
              attendance.value === "yes"
                ? "Attending"
                : "Declined",

            number_attending:
              numberAttending,

            event:
              "Hena & Abdullah Engagement",

            event_date:
              "Wednesday, November 11, 2026",

            event_time:
              "6:00 PM - 11:00 PM",

            event_address:
              "21075 Dulles Town Cir, Sterling, VA 20166",

            _subject:
              `New Engagement RSVP - ${fullName.value.trim()}`,

            _template:
              "table",

            _replyto:
              guestEmail.value.trim()

          };


          try {

            const response =
              await fetch(
                "https://formsubmit.co/ajax/henaabdullahrsvp@gmail.com",
                {

                  method: "POST",

                  headers: {

                    "Content-Type":
                      "application/json",

                    "Accept":
                      "application/json"

                  },

                  body:
                    JSON.stringify(
                      rsvpData
                    )

                }
              );


            if (!response.ok) {

              throw new Error(
                "RSVP could not be sent."
              );

            }


            const name =
              fullName.value.trim();

            const attending =
              attendance.value;


            if (
              attending === "yes"
            ) {

              thankYouMessage.textContent =
                `Thank you, ${name}! We can't wait to celebrate this special day with you.`;

            } else {

              thankYouMessage.textContent =
                `Thank you, ${name}, for letting us know. You will be missed!`;

            }


            thankYouSection.classList.remove(
              "hidden"
            );


            thankYouSection.scrollIntoView({
              behavior: "smooth"
            });


            form.reset();


            guestCount.style.display =
              "";

            guestCount.required =
              true;


          } catch (error) {

            console.error(error);


            rsvpStatus.textContent =
              "Your RSVP could not be sent. Please try again.";

          } finally {

            submitButton.disabled =
              false;

            submitButton.textContent =
              "Submit RSVP";

          }

        }
      );

    }



    // =====================================
    // RSVP COUNTDOWN
    // NOVEMBER 7, 2026
    // =====================================

    const daysElement =
      document.getElementById(
        "days"
      );

    const hoursElement =
      document.getElementById(
        "hours"
      );

    const minutesElement =
      document.getElementById(
        "minutes"
      );

    const secondsElement =
      document.getElementById(
        "seconds"
      );


    const rsvpDeadline =
  new Date("2026-11-11T17:00:00-05:00").getTime();


    function updateCountdown() {

      const now =
        new Date().getTime();


      const distance =
        rsvpDeadline - now;


      if (distance <= 0) {

        daysElement.textContent =
          "00";

        hoursElement.textContent =
          "00";

        minutesElement.textContent =
          "00";

        secondsElement.textContent =
          "00";

        return;

      }


      const days =
        Math.floor(
          distance /
          (1000 * 60 * 60 * 24)
        );


      const hours =
        Math.floor(
          (
            distance %
            (1000 * 60 * 60 * 24)
          ) /
          (1000 * 60 * 60)
        );


      const minutes =
        Math.floor(
          (
            distance %
            (1000 * 60 * 60)
          ) /
          (1000 * 60)
        );


      const seconds =
        Math.floor(
          (
            distance %
            (1000 * 60)
          ) /
          1000
        );


      daysElement.textContent =
        String(days).padStart(
          2,
          "0"
        );


      hoursElement.textContent =
        String(hours).padStart(
          2,
          "0"
        );


      minutesElement.textContent =
        String(minutes).padStart(
          2,
          "0"
        );


      secondsElement.textContent =
        String(seconds).padStart(
          2,
          "0"
        );

    }


    if (
      daysElement &&
      hoursElement &&
      minutesElement &&
      secondsElement
    ) {

      updateCountdown();

      setInterval(
        updateCountdown,
        1000
      );

    }



    // =====================================
    // ADD TO CALENDAR
    // =====================================

    const calendarButton =
      document.getElementById(
        "add-to-calendar"
      );


    if (calendarButton) {

      calendarButton.addEventListener(
        "click",
        function () {

          const calendarData = [

            "BEGIN:VCALENDAR",

            "VERSION:2.0",

            "PRODID:-//Hena and Abdullah//Engagement Invitation//EN",

            "BEGIN:VEVENT",

            "UID:hena-abdullah-engagement-20261111",

            "DTSTAMP:20261017T000000Z",

            "DTSTART;TZID=America/New_York:20261111T180000",

            "DTEND;TZID=America/New_York:20261111T230000",

            "SUMMARY:Hena & Abdullah's Engagement Party",

            "LOCATION:21075 Dulles Town Cir\\, Sterling\\, VA 20166",

            "DESCRIPTION:Join us in celebrating the engagement of Hena & Abdullah.",

            "END:VEVENT",

            "END:VCALENDAR"

          ].join("\r\n");


          const blob =
            new Blob(
              [calendarData],
              {
                type:
                  "text/calendar;charset=utf-8"
              }
            );


          const url =
            URL.createObjectURL(
              blob
            );


          const link =
            document.createElement(
              "a"
            );


          link.href = url;

          link.download =
            "Hena-Abdullah-Engagement.ics";


          document.body.appendChild(
            link
          );


          link.click();


          document.body.removeChild(
            link
          );


          URL.revokeObjectURL(
            url
          );

        }
      );

    }


  }
);