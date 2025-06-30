export default function UserGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-gray-100">
        Monie User Guide
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
          1. Signing Up
        </h2>
        <p className=" text-black dark:text-gray-200">
          To use Monie, create an account using your email address or sign in
          with GitHub. Please ensure your email is valid, as we will send you a
          verification email to activate your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
          2. Logging In
        </h2>
        <p className=" text-black dark:text-gray-200">
          You can log in using your email or GitHub account. Note: since
          we&apos;re on a basic hosting plan, the backend may take a few seconds
          to wake up if it&apos;s been idle.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
          3. Dashboard Overview
        </h2>
        <p className=" text-black dark:text-gray-200">
          After login, you&apos;ll be redirected to your dashboard. Initially,
          charts will not be displayed until you make at least one transaction.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
          4. Default Account
        </h2>
        <p className=" text-black dark:text-gray-200">
          A default account named <strong>&quot;Main&quot;</strong> is
          automatically created. All your funds and transactions are initially
          channeled through this account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
          5. Account Limit
        </h2>
        <p className=" text-black dark:text-gray-200">
          You can create up to <strong>7 additional accounts</strong> in
          addition to the default one, making a total of 8 accounts.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
          6. Transactions
        </h2>
        <p className=" text-black dark:text-gray-200">
          Once you start adding transactions, they will appear under the
          respective routes:
          <strong> Income</strong> and <strong> Expenses</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
          7. Upcoming Features
        </h2>
        <ul className="list-disc ml-5 space-y-1 text-black dark:text-gray-200">
          <li>Automatic currency conversion based on user location</li>
          <li>Transaction exporting and reporting features</li>
          <li>A mobile application</li>
          <li>
            Parsing of financial data from user messages (e.g. emails/SMS)
          </li>
        </ul>
        <p className="mt-2  text-black dark:text-gray-200">
          Official communication will be provided once these features go live.
        </p>
      </section>
    </div>
  );
}
