const sampleRepos = require('../sampleDB/repositories');

const Repository = require('../models/Repository');

const addRepos = () => {
  return Promise.all(
    sampleRepos.map(async (item) => {
      const newRepo = new Repository({
        id: item.id,
        fullname: item.fullName,
        description: item.description,
        language: item.language,
        forksCount: item.forksCount,
        stargazersCount: item.stargazersCount,
        ratingAverage: item.ratingAverage,
        reviewCount: item.reviewCount,
        ownerAvatarUrl: item.ownerAvatarUrl,
      });

      await newRepo.save();
    })
  );
};

module.exports = { addRepos };
