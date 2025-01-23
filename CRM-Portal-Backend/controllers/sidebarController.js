// sidebarController.js
exports.getSidebarTitles = (req, res) => {
    const titles = [
      "Dashboard",
      "Bugs Tracking",
      "Performance / Achievements",
      "Check-In/Out",
      "Holidays",
      "Feedback",
      "Contact Us",
      "New User",
    ];
  
    res.status(200).json({ titles });
  };
  