export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
  const yOffset = -50;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};

export const replaceSpace = (text) => text.split(' ').join('')