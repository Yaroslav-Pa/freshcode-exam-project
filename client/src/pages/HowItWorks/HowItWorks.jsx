import Header from '../../components/Header/Header';
import HeroSection from '../../components/HowItWorksSections/HeroSection/HeroSection';
import WaysToUseSection from '../../components/HowItWorksSections/WaysToUseSection/WaysToUseSection';
import HowContestsWorkSection from '../../components/HowItWorksSections/HowContestsWorkSection/HowContestsWorkSection';
import FAQSection from '../../components/HowItWorksSections/FAQSection/FAQSection';
import SearchSection from '../../components/HowItWorksSections/SearchSection/SearchSection';
import Footer from '../../components/Footer/Footer';

const HowItWorks = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <WaysToUseSection />
      <HowContestsWorkSection />
      <FAQSection />
      <SearchSection />
      <Footer />
    </>
  );
};

export default HowItWorks;
