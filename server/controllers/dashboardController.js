const { students, applications, fees, users, timetableEntries } = require('../data/demoData');

// GET /api/v1/dashboard/admin-metrics
const getAdminMetrics = (req, res) => {
  const totalStudents = students.length + 180; // realistic total including roster
  const totalApplications = applications.length;
  const pendingTrials = applications.filter(a => a.status === 'Trial Scheduled').length;
  const underReview = applications.filter(a => a.status === 'Under Review' || a.status === 'Submitted').length;

  const totalFeesExpected = fees.reduce((sum, f) => sum + f.amount, 0) + 120000;
  const totalFeesCollected = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0) + 98000;
  const collectionRate = Math.round((totalFeesCollected / totalFeesExpected) * 100);

  const sportsBreakdown = [
    { sport: 'Tennis', count: 48 },
    { sport: 'Football', count: 52 },
    { sport: 'Basketball', count: 36 },
    { sport: 'Swimming', count: 28 },
    { sport: 'Athletics & Track', count: 24 }
  ];

  const recentApplications = applications.slice(0, 5);

  return res.status(200).json({
    success: true,
    metrics: {
      totalStudents,
      totalApplications,
      pendingTrials,
      underReview,
      totalFeesCollected,
      totalFeesExpected,
      collectionRate,
      averageAttendance: 96.5,
      sportsBreakdown,
      recentApplications,
      activeStaffCount: users.filter(u => u.role !== 'parent' && u.role !== 'student').length
    }
  });
};

module.exports = {
  getAdminMetrics
};
