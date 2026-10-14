import DonationHero from '@/staticComponents/donation/DonationHero';
import DonationForm from '@/staticComponents/donation/DonationForm';
import DonationImpact from '@/staticComponents/donation/DonationImpact';
import Footer from '@/staticComponents/Footer';

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white">
      <DonationHero />
      <DonationForm/>
      <DonationImpact />
    </main>
  );
}