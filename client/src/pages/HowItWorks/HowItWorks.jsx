import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import WaysToUseSection from '../../components/WaysToUseSection/WaysToUseSection';
import HowContestsWorkSection from '../../components/HowContestsWorkSection/HowContestsWorkSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import SearchSection from '../../components/SearchSection/SearchSection';
import Footer from '../../components/Footer/Footer';

const HowItWorks = () => {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <HeroSection />
      {/* Ways To Use Section */}
      <WaysToUseSection />
      {/* HowContestsWorkSection */}
      <HowContestsWorkSection />
      {/* Frequently Asked Questions */}
      <FAQSection />
      {/* Search Section*/}
      <SearchSection />
      <Footer/>
    </>
  );
};

export default HowItWorks;