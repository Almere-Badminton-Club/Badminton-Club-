import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen p-9 sm:p-6">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          About Us
        </h1>
        <p className="text-base sm:text-lg mb-2 sm:mb-4">
          Welcome to Badminton/Games in Almere!
        </p>
        <p className="text-sm sm:text-base mb-4 sm:mb-6">
          We are a vibrant community of badminton enthusiasts located in Almere,
          where we come together to enjoy the sport, improve our skills, and
          foster a friendly and inclusive environment for all players. Our
          activities are held at the Sportzaal Waterwijk, conveniently located
          at Slagbaai 14, 1317AC Almere.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
          Play Days and Timings (Till June 2024):
        </h2>
        <ul className="list-disc list-inside text-sm sm:text-base mb-4 sm:mb-6">
          <li>
            <strong>Monday:</strong> 8:30 PM - 10:00 PM
          </li>
          <li>
            <strong>Tuesday:</strong> 9:00 PM - 10:30 PM
          </li>
          <li>
            <strong>Wednesday:</strong> 8:30 PM - 10:00 PM
          </li>
          <li>
            <strong>Friday:</strong> 9:30 PM - 11:00 PM
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
          Booking and Payments:
        </h2>
        <ol className="list-decimal list-inside text-sm sm:text-base mb-4 sm:mb-6">
          <li className="mb-2 sm:mb-4">
            <strong>Booking:</strong>
            <p>
              Add your name to the circulated list and pay via Tikkie as soon as
              you add your name. Please note, if you are on the waitlist, do not
              make a payment until your spot is confirmed. Failure to pay will
              result in removal from the list.
            </p>
          </li>
          <li className="mb-2 sm:mb-4">
            <strong>Cancellation:</strong>
            <p>
              Refunds are available only if a replacement is found. Replacement
              is applicable only after all 20 spots are filled. To cancel, add
              "- C1" to your name in the list. Follow the sequence if others
              have already canceled (e.g., "- C2", "- C3"). Track cancellation
              by tagging the person first on the waitlist.
            </p>
          </li>
          <li>
            <strong>Replacement:</strong>
            <p>
              Based on the waitlist sequence, the person at the top of the
              waitlist replaces the canceled spot.
            </p>
          </li>
        </ol>

        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
          General Rules:
        </h2>
        <ul className="list-disc list-inside text-sm sm:text-base mb-4 sm:mb-6">
          <li>
            <strong>No Show:</strong> Separate warnings and fines will apply for
            no-shows.
          </li>
          <li>
            <strong>Indoor/No-Mark Shoes:</strong> Required to maintain court
            cleanliness and avoid marks.
          </li>
          <li>
            <strong>Equipment:</strong> Bring your own badminton racquet.
            Shuttles and nets are provided by the organizer.
          </li>
          <li>
            <strong>Costs:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>One-time contribution of €4 for new members.</li>
              <li>Game costs are €4 per 90-minute session.</li>
              <li>Payments must be completed for spot confirmation.</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
          Gameplay Rules:
        </h2>
        <ul className="list-disc list-inside text-sm sm:text-base mb-4 sm:mb-6">
          <li>
            No individual plays more than 2 games in a row if someone is
            waiting.
          </li>
          <li>
            After every game, at least 2 players should move out to make space
            for others.
          </li>
          <li>For the first game for all, the losing team moves out.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
          Additional Guidelines:
        </h2>
        <ul className="list-disc list-inside text-sm sm:text-base mb-4 sm:mb-6">
          <li>
            <strong>Shuffle Around:</strong> It is mandatory to shuffle around
            while playing to ensure everyone gets to play with different
            partners.
          </li>
          <li>
            <strong>WhatsApp Promotion:</strong> No promotion of WhatsApp
            groups. Violators will be banned.
          </li>
        </ul>

        <p className="text-base sm:text-lg">
          We look forward to seeing you on the court and enjoying some great
          games together! For more information or to join our community, visit
          our
          <a
            href="https://chat.whatsapp.com/IUUgT2oicUC92YIcnq11Jh"
            className="text-blue-500 underline"
          >
            {" "}
            WhatsApp group
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
