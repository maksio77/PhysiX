export const searchInputText = (sections, text) => {
  let results = [];
  if (text.trim().length > 2) {
    const lowerCaseText = text.toLowerCase();
    sections.forEach((section) => {
      section.themes.forEach((theme) => {
        theme.info.forEach((info, index) => {
          const contentLowercase = info.text.toLowerCase();
          if (contentLowercase.includes(lowerCaseText)) {
            const startIndex = contentLowercase.indexOf(lowerCaseText);
            const matchingText = info.text.substring(
              startIndex,
              startIndex + 35
            );
            const page = Math.floor(index / 6) + 1;
            results.push({
              text: `${section.sectionName} > ${theme.themeName} > "${matchingText}..."`,
              route: `sections/${section.routeName}/${theme.themeRoute}/${page}`,
              state: {
                searchPhrase: matchingText,
              },
            });
          }
        });
      });
    });
  }
  return results;
};
