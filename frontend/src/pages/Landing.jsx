const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex flex-col items-center mb-12">
        <video
          src="/coin.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-40 h-auto "
        />
        <h1 className="indie-flower-regular text-7xl text-primary text-center">
          Simple Budget
        </h1>
      </div>
      <div className="flex gap-4">
        <a href="/signup" className="btn btn-accent">
          Sign Up
        </a>
        <a href="/login" className="btn btn-secondary">
          Log In
        </a>
      </div>
      <div className="text-content my-20 w-full space-y-4 px-4 sm:px-20 lg:px-40">
        <h2 className="font-bold text-xl">What is Simple Budget?</h2>
        <p>
          Simple Budget is a free app that helps you manage your money with a
          clear, intuitive system. It’s designed to simplify budgeting and make
          it easy to see where your money goes—without spreadsheets or
          complicated tools.
        </p>

        <h2 className="font-bold text-xl">How does Simple Budget work?</h2>
        <p>
          The app is built to implement the 50/30/20 budgeting rule, dividing
          income into three categories: needs, wants, and savings. You can also
          adjust these allocations to fit your personal goals, giving you a
          clear picture of your finances and helping you make smarter spending
          decisions.
        </p>
        <h2 className="font-bold text-xl">Who is Simple Budget for?</h2>
        <p>
          This app is perfect for people who want an easy way to track spending
          and save money. Whether you’re just starting out, trying to get a
          better handle on your finances, or want a clear snapshot of your
          monthly habits, Simple Budget gives you a practical, straightforward
          solution.
        </p>
      </div>
    </div>
  );
};

export default Landing;
