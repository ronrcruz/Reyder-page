import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale iPhones, Used Phones & Mobile Devices for Sale | Reyder Enterprises Blog',
  description: 'Discover the best deals on phones for sale, including used iPhones and wholesale electronics. Reyder Enterprises is your trusted source for mobile devices wholesale.',
  keywords: ['phones for sale', 'used phones', 'used iphones', 'mobile devices wholesale', 'wholesale electronics', 'wholesale iphones', 'Reyder Enterprises'],
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-24 lg:py-32 text-[#222222]">
      <article>
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#5A2964] mb-4">
            Your Source for Wholesale Mobile Devices & Used Phones
          </h1>
          <p className="text-xl text-gray-600">
            Insights, deals, and news on wholesale electronics, used iPhones, and quality mobile devices.
          </p>
        </header>

        <section className="mb-16 prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#5A2964] mb-4">
            Finding the Best Phones for Sale: New & Used iPhones
          </h2>
          <p>
            When looking for <span className="font-semibold">phones for sale</span>, it\'s crucial to consider both new and pre-owned options. Many buyers are specifically searching for <span className="font-semibold">used iPhones</span> due to their reliability and value. Our platform provides access to a wide variety of devices, ensuring you find what you need. We specialize in connecting buyers with quality <span className="font-semibold">used phones</span> that meet rigorous testing standards.
          </p>
          <p>
            Whether you\'re a reseller or a business looking to equip your team, finding trustworthy sources for <span className="font-semibold">used iPhones for sale</span> is paramount. Our blog aims to guide you through the process, offering tips on what to look for and how to secure the best deals.
          </p>

          <hr className="my-8" />

          <h2 className="text-3xl font-semibold text-[#5A2964] mb-4">
            The Advantage of Mobile Devices Wholesale
          </h2>
          <p>
            Purchasing <span className="font-semibold">mobile devices wholesale</span> offers significant advantages, especially for businesses looking to buy in bulk. At Reyder Enterprises, we provide a seamless experience for acquiring <span className="font-semibold">wholesale electronics</span>, including a large inventory of <span className="font-semibold">wholesale iPhones</span>. This approach not only saves costs but also ensures a consistent supply of high-quality devices.
          </p>
          <p>
            Our expertise in <span className="font-semibold">mobile devices wholesale</span> means we understand the market dynamics and can offer competitive pricing on premium <span className="font-semibold">wholesale iPhones</span> and other electronics. Stay tuned to our blog for updates on inventory and market trends.
          </p>
          {/* Add more sections and articles as needed */}
          <p className="mt-8 text-center">
            <Link href="/" className="text-[#2F7971] hover:underline">
              &larr; Back to Homepage
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
} 