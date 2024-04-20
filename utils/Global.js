import _ from 'lodash'
import { ClockIcon, ChartPieIcon, UserGroupIcon } from '@heroicons/vue/20/solid'

export class GlobalState {
  static entityNames = [
    'auditlogs',
    'contests',
    'users',
    'articles',
    'badges',
    'comments',
    'companies',
    'jobs',
    'participants',
    'guides',
    'notifications',
    'notificationItems',
    'posts',
    'problems',
    'submissions',
    'topics',
    'wizards',
    'foos',
  ]
  static formSortedFields(entityName) {
    // Sort fields => primitives, enums, relations
    const thisEntity = this.entities[entityName]
    let attributes = Object.keys(thisEntity).filter((a) => a !== '_id')
    attributes = Object.entries(thisEntity)
      .map(([k, v]) => ({ name: k, ...v }))
      .filter((a) => a.name !== '_id')
    attributes = Type.sortOnType(attributes)
    return attributes
  }
  static entityCols(entityName) {
    // Sort cols => primitives, enums, relations
    // Add empty & _id cols to the start for ellipsis & checkbox respectively
    let thisEntity = this.entities[entityName]
    let attributes = Object.keys(thisEntity).filter((a) => a !== '_id')
    attributes = Object.entries(thisEntity)
      .map(([k, v]) => ({ name: k, ...v }))
      .filter((a) => a.name !== '_id')
    attributes = Type.sortOnType(attributes)
    return [
      { name: '', type: '' },
      { name: '_id', type: 'string' },
      ...attributes,
    ]
  }
  static sidebar = [
    { path: 'dashboard', label: 'Dashboard', icon: ChartPieIcon },
    { path: 'auditlogs', label: 'Audit Logs', icon: ClockIcon },
    { path: 'users', label: 'Users', icon: UserGroupIcon },
    { path: 'contests', label: 'Contests' },
    { path: 'articles', label: 'Articles' },
    { path: 'badges', label: 'Badges' },
    { path: 'comments', label: 'Comments' },
    { path: 'companies', label: 'Companies' },
    { path: 'jobs', label: 'Jobs' },
    { path: 'participants', label: 'Participants' },
    { path: 'guides', label: 'Guides' },
    { path: 'notifications', label: 'Notifications' },
    { path: 'notificationItems', label: 'NotificationItems' },
    { path: 'posts', label: 'Posts' },
    { path: 'problems', label: 'Problems' },
    { path: 'submissions', label: 'Submissions' },
    { path: 'topics', label: 'Topics' },
    { path: 'wizards', label: 'Wizards' },
    { path: 'foos', label: 'Foos' },
  ]
  static entities = {
    contests: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      name: {
        type: 'string',
        label: 'Name',

        placeholder: '',
      },
      body: {
        type: 'string',
        label: 'Body',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      company: {
        type: 'relation',
        label: 'Company',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      sponsor: {
        type: 'relation',
        label: 'Sponsor',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      timeStart: {
        type: 'dateTime',
        label: 'Start Time',

        placeholder: '',
      },
      timeEnd: {
        type: 'dateTime',
        label: 'End Time',

        placeholder: '',
      },
      problem: {
        type: 'relation',
        label: 'Problems',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
      submissions: {
        type: 'relation',
        label: 'Submissions',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      users: {
        type: 'relation',
        label: 'Users',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
    },
    users: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      email: {
        type: 'string',
        label: 'Email',

        placeholder: '',
      },
      passwordDigest: {
        type: 'string',
        label: 'Password Digest',

        placeholder: '',
      },
      firstName: {
        type: 'string',
        label: 'First Name',

        placeholder: '',
      },
      lastName: {
        type: 'string',
        label: 'Last Name',

        placeholder: '',
      },
      age: {
        type: 'integer',
        label: 'Age',

        placeholder: '',
      },
      city: {
        type: 'string',
        label: 'City',

        placeholder: '',
      },
      country: {
        type: 'string',
        label: 'Country',

        placeholder: '',
      },
      dob: {
        type: 'date',
        label: 'DOB',

        placeholder: '',
      },
      status: {
        type: 'enumerator',
        label: 'Status',

        placeholder: '',
        options: ['active', 'blocked', 'closed', 'deactivated', 'pending'],
      },
      username: {
        type: 'string',
        label: 'Username',

        placeholder: '',
      },
      urlAvatar: {
        type: 'string',
        label: 'AvatarURL',

        placeholder: '',
      },
      urlPaypal: {
        type: 'string',
        label: 'PaypalURL',

        placeholder: '',
      },
      urlGithub: {
        type: 'string',
        label: 'GithubURL',

        placeholder: '',
      },
      urlLinkedIn: {
        type: 'string',
        label: 'LinkedInURL',

        placeholder: '',
      },
      urlPortfolio: {
        type: 'string',
        label: 'PortfolioURL',

        placeholder: '',
      },
      urlCSProfile: {
        type: 'string',
        label: 'urlCSProfile',

        placeholder: '',
      },
      urlSites: {
        type: 'string',
        label: 'SiteURLs',

        placeholder: '',
      },
      views: {
        type: 'integer',
        label: '# Views',

        placeholder: '',
      },
      discuss: {
        type: 'integer',
        label: '# Discuss',

        placeholder: '',
      },
      solutions: {
        type: 'integer',
        label: '# Solutions',

        placeholder: '',
      },
      reputation: {
        type: 'integer',
        label: 'Reputation',

        placeholder: '',
      },
      contestRating: {
        type: 'integer',
        label: 'Contest Rating',

        placeholder: '',
      },
      globalRanking: {
        type: 'integer',
        label: 'Global Ranking',

        placeholder: '',
      },
      attended: {
        type: 'integer',
        label: '# Attended',

        placeholder: '',
      },
      startYear: {
        type: 'integer',
        label: 'Start Year',

        placeholder: '',
      },
      numSubmissions: {
        type: 'integer',
        label: '# Submissions',

        placeholder: '',
      },
      numAcceptedProblems: {
        type: 'integer',
        label: '# Accepted Problems',

        placeholder: '',
      },
      numSubmittedProblems: {
        type: 'integer',
        label: '# Submitted Problems',

        placeholder: '',
      },
      numAcceptedSubmissions: {
        type: 'integer',
        label: '# Accepted Submissions',

        placeholder: '',
      },
      gender: {
        type: 'string',
        label: 'Gender',

        placeholder: '',
      },
      top: {
        type: 'decimal',
        label: 'Top',

        placeholder: '',
      },
      submissions: {
        type: 'relation',
        label: 'Submissions',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      posts: {
        type: 'relation',
        label: 'Posts',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      contests: {
        type: 'relation',
        label: 'Contests',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
      comments: {
        type: 'relation',
        label: 'Comments',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      articles: {
        type: 'relation',
        label: 'Articles',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      problems: {
        type: 'relation',
        label: 'Problems',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      meta: {
        type: 'map',
        label: 'Meta Data',

        placeholder: 'Meta Data',
      },
      badges: {
        type: 'relation',
        label: 'Badges',
        relation: 'mtm',
        placeholder: '',
      },
      role: {
        type: 'enumeratorMulti',
        label: 'Role',

        placeholder: 'customer, employee, admin',
        options: ['admin', 'customer', 'owner', 'staff'],
      },
      streak: {
        type: 'map',
        label: 'Steak',

        placeholder: '',
      },
      languages: {
        type: 'map',
        label: 'Languages',

        placeholder: '',
      },
    },
    articles: {
      type: {
        type: 'string',
        label: 'Type',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      caption: {
        type: 'string',
        label: 'Caption',

        placeholder: '',
      },
      body: {
        type: 'text',
        label: 'Body',

        placeholder: '',
      },
      link: {
        type: 'string',
        label: 'Link',

        placeholder: '',
      },
      urlCoverImg: {
        type: 'string',
        label: 'Cover Img',

        placeholder: '',
      },
      urlVideo: {
        type: 'string',
        label: 'Video',

        placeholder: '',
      },
      language: {
        type: 'string',
        label: 'Language',

        placeholder: '',
      },
      numComments: {
        type: 'integer',
        label: 'Number Comments',

        placeholder: '',
      },
      numVotes: {
        type: 'integer',
        label: 'Number Votes',

        placeholder: '',
      },
      isPublished: {
        type: 'boolean',
        label: 'Published?',

        placeholder: '',
      },
      isOriginal: {
        type: 'boolean',
        label: 'Original?',

        placeholder: '',
      },
      author: {
        type: 'relation',
        label: 'Author',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      comments: {
        type: 'relation',
        label: 'Comments',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      voterIds: {
        type: 'map',
        label: 'Voter IDs',

        placeholder: '',
      },
    },
    badges: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      name: {
        type: 'string',
        label: 'Name',

        placeholder: '',
      },
      urlImg: {
        type: 'string',
        label: 'ImgURL',

        placeholder: '',
      },
      year: {
        type: 'integer',
        label: 'Year',

        placeholder: '',
      },
      month: {
        type: 'integer',
        label: 'Month',

        placeholder: '',
      },
      users: {
        type: 'relation',
        label: 'Users',
        relation: 'mtm',
        placeholder: '',
      },
    },
    comments: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      body: {
        type: 'text',
        label: 'Body',

        placeholder: '',
      },
      code: {
        type: 'text',
        label: 'Code',

        placeholder: '',
      },
      user: {
        type: 'relation',
        label: 'User',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      post: {
        type: 'relation',
        label: 'Post',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      article: {
        type: 'relation',
        label: 'Article',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      comment: {
        type: 'relation',
        label: 'Comment',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      comments: {
        type: 'relation',
        label: 'Comments',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      problem: {
        type: 'relation',
        label: 'Problem',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      submission: {
        type: 'relation',
        label: 'Submission',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      voterIds: {
        type: 'map',
        label: 'Voter IDs',

        placeholder: '',
      },
    },
    companies: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      name: {
        type: 'string',
        label: 'Name',

        placeholder: '',
      },
      industry: {
        type: 'string',
        label: 'Industry',

        placeholder: '',
      },
      founded: {
        type: 'string',
        label: 'Founded',

        placeholder: '',
      },
      location: {
        type: 'string',
        label: 'Location',

        placeholder: '',
      },
      urlAvatar: {
        type: 'string',
        label: 'AvatarURL',

        placeholder: '',
      },
      teamSize: {
        type: 'integer',
        label: 'Team Size',

        placeholder: '',
      },
      industries: {
        type: 'array',
        label: 'Industries',

        placeholder: '',
      },
      founders: {
        type: 'array',
        label: 'Founders',

        placeholder: '',
      },
      technologies: {
        type: 'array',
        label: 'Technologies',

        placeholder: '',
      },
      jobs: {
        type: 'relation',
        label: 'Jobs',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
    },
    jobs: {
      _id: {
        type: 'string',
        label: 'undefined',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      caption: {
        type: 'string',
        label: 'Caption',

        placeholder: '',
      },
      location: {
        type: 'string',
        label: 'Location',

        placeholder: '',
      },
      type: {
        type: 'string',
        label: 'Type',

        placeholder: '',
      },
      description: {
        type: 'text',
        label: 'Description',

        placeholder: '',
      },
      experience: {
        type: 'string',
        label: 'Experience',

        placeholder: '',
      },
      project: {
        type: 'string',
        label: 'Project',

        placeholder: '',
      },
      requirements: {
        type: 'text',
        label: 'Requirements',

        placeholder: '',
      },
      whoAreYou: {
        type: 'text',
        label: 'Who are you',

        placeholder: '',
      },
      equity: {
        type: 'string',
        label: 'Equity',

        placeholder: '',
      },
      benefits: {
        type: 'text',
        label: 'Benefits',

        placeholder: '',
      },
      isRemote: {
        type: 'boolean',
        label: 'Remote?',

        placeholder: '',
      },
      technologies: {
        type: 'array',
        label: 'Technologies',

        placeholder: '',
      },
      company: {
        type: 'relation',
        label: 'Company',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      user: {
        type: 'relation',
        label: 'User',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
    },
    participants: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      name: {
        type: 'string',
        label: 'Name',

        placeholder: '',
      },
      contest: {
        type: 'relation',
        label: 'Contest',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      user: {
        type: 'relation',
        label: 'User',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      submission: {
        type: 'relation',
        label: 'Submissions',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      score: {
        type: 'integer',
        label: 'Score',

        placeholder: '',
      },
      rank: {
        type: 'integer',
        label: 'Rank',

        placeholder: '',
      },
      rating: {
        type: 'integer',
        label: 'Rating',

        placeholder: '',
      },
      time: {
        type: 'dateTime',
        label: 'Time',

        placeholder: '',
      },
    },
    guides: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      body: {
        type: 'string',
        label: 'Body',

        placeholder: '',
      },
      caption: {
        type: 'string',
        label: 'Caption',

        placeholder: '',
      },
      description: {
        type: 'string',
        label: 'Description',

        placeholder: '',
      },
      topics: {
        type: 'relation',
        label: 'Topics',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
      problems: {
        type: 'relation',
        label: 'Problems',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
    },
    notifications: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      body: {
        type: 'text',
        label: 'Body',

        placeholder: '',
      },
      type: {
        type: 'string',
        label: 'Type',

        placeholder: '',
      },
      points: {
        type: 'integer',
        label: 'Points',

        placeholder: '',
      },
      isPublished: {
        type: 'boolean',
        label: 'Published?',

        placeholder: '',
      },
      date: {
        type: 'date',
        label: 'Date',

        placeholder: '',
      },
    },
    notificationItems: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      icon: {
        type: 'integer',
        label: 'Icon',

        placeholder: '',
      },
      isRead: {
        type: 'boolean',
        label: 'Read?',

        placeholder: '',
      },
      points: {
        type: 'integer',
        label: 'Points',

        placeholder: '',
      },
      date: {
        type: 'dateTime',
        label: 'Date',

        placeholder: '',
      },
      notifiableId: {
        type: 'string',
        label: 'NotifiableId',

        placeholder: '',
      },
      notifiableType: {
        type: 'string',
        label: 'NotifiableType',

        placeholder: '',
      },
      type: {
        type: 'string',
        label: 'Type',

        placeholder: '',
      },
      notification: {
        type: 'string',
        label: 'Notification',

        placeholder: '',
      },
      user: {
        type: 'relation',
        label: 'User',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
    },
    posts: {
      _id: {
        type: 'string',
        label: 'undefined',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      body: {
        type: 'text',
        label: 'Body',

        placeholder: '',
      },
      isPublished: {
        type: 'boolean',
        label: 'Published?',

        placeholder: '',
      },
      numVotes: {
        type: 'integer',
        label: '# Votes',

        placeholder: '',
      },
      numViews: {
        type: 'integer',
        label: '# Views',

        placeholder: '',
      },
      numComments: {
        type: 'integer',
        label: '# Comments',

        placeholder: '',
      },
      timeSubmitted: {
        type: 'dateTime',
        label: 'Time Submitted',

        placeholder: '',
      },
      user: {
        type: 'relation',
        label: 'User',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      comments: {
        type: 'relation',
        label: 'Comments',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      topics: {
        type: 'relation',
        label: 'Topics',
        relation: 'mtm',
        placeholder: 'one-to-many',
      },
      voterIds: {
        type: 'map',
        label: 'Voter IDs',

        placeholder: '',
      },
    },
    problems: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      body: {
        type: 'text',
        label: 'Body',

        placeholder: '',
      },
      frequency: {
        type: 'string',
        label: 'Frequency',

        placeholder: '',
      },
      difficulty: {
        type: 'string',
        label: 'Difficulty',

        placeholder: '',
      },
      author: {
        type: 'relation',
        label: 'Author',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      isPublished: {
        type: 'boolean',
        label: 'Published?',

        placeholder: '',
      },
      isSubmitted: {
        type: 'boolean',
        label: 'Submitted?',

        placeholder: '',
      },
      numLC: {
        type: 'integer',
        label: 'LC #',

        placeholder: '',
      },
      voterIds: {
        type: 'map',
        label: 'Voter IDs',

        placeholder: '',
      },
      editorialAuthor: {
        type: 'relation',
        label: 'Editor',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      editorialBody: {
        type: 'text',
        label: 'Editorial Body',

        placeholder: '',
      },
      editorialRating: {
        type: 'decimal',
        label: 'Editorial Rating',

        placeholder: '',
      },
      editorialVotes: {
        type: 'integer',
        label: 'Editorial Votes',

        placeholder: '',
      },
      accepted: {
        type: 'decimal',
        label: 'Accepted',

        placeholder: '',
      },
      submissions: {
        type: 'decimal',
        label: 'Submissions',

        placeholder: '',
      },
      acceptanceRate: {
        type: 'decimal',
        label: 'Acceptance Rate',

        placeholder: '',
      },
      testSuite: {
        type: 'array',
        label: 'Test Suite',

        placeholder: '',
      },
      topics: {
        type: 'relation',
        label: 'Topics',
        relation: 'mtm',
        placeholder: '',
      },
      hints: {
        type: 'array',
        label: 'Hints',

        placeholder: '',
      },
      constraints: {
        type: 'array',
        label: 'Constraints',

        placeholder: '',
      },
    },
    submissions: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      body: {
        type: 'text',
        label: 'Body',

        placeholder: '',
      },
      title: {
        type: 'string',
        label: 'Title',

        placeholder: '',
      },
      explanation: {
        type: 'text',
        label: 'Explanation',

        placeholder: '',
      },
      language: {
        type: 'string',
        label: 'Language',

        placeholder: '',
      },
      notes: {
        type: 'text',
        label: 'Notes',

        placeholder: '',
      },
      user: {
        type: 'relation',
        label: 'User',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      comments: {
        type: 'relation',
        label: 'Comments',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      problem: {
        type: 'relation',
        label: 'Problem',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      contest: {
        type: 'relation',
        label: 'Contest',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      timeSubmitted: {
        type: 'dateTime',
        label: 'Submit Time',

        placeholder: '',
      },
      isPublished: {
        type: 'boolean',
        label: 'Published?',

        placeholder: '',
      },
      isShared: {
        type: 'boolean',
        label: 'Shared?',

        placeholder: '',
      },
      isContest: {
        type: 'boolean',
        label: 'Contest?',

        placeholder: '',
      },
      penalty: {
        type: 'integer',
        label: 'Penalty',

        placeholder: '',
      },
      numVotes: {
        type: 'integer',
        label: '# Votes',

        placeholder: '',
      },
      numComments: {
        type: 'integer',
        label: '# Comments',

        placeholder: '',
      },
      runTime: {
        type: 'decimal',
        label: 'Run Time',

        placeholder: '',
      },
      beats: {
        type: 'decimal',
        label: 'Beats',

        placeholder: '',
      },
      voterIds: {
        type: 'map',
        label: 'Voter IDs',

        placeholder: '',
      },
      topics: {
        type: 'relation',
        label: 'Topics',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
    },
    topics: {
      _id: {
        type: 'text',
        label: 'undefined',

        placeholder: '',
      },
      name: {
        type: 'string',
        label: 'Name',

        placeholder: '',
      },
      posts: {
        type: 'relation',
        label: 'Posts',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
      guides: {
        type: 'relation',
        label: 'Guides',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
      problems: {
        type: 'relation',
        label: 'Problems',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
      contests: {
        type: 'relation',
        label: 'Contests',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
      submissions: {
        type: 'relation',
        label: 'Submissions',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
    },
    wizards: {
      email: {
        type: 'string',
        label: 'email',

        placeholder: '',
      },
      firstName: {
        type: 'string',
        label: 'firstName',

        placeholder: '',
      },
      lastName: {
        type: 'string',
        label: 'lastName',

        placeholder: '',
      },
      dob: {
        type: 'string',
        label: 'dob',

        placeholder: '',
      },
      location: {
        type: 'map',
        label: 'location',

        placeholder: '',
      },
      jobTitle: {
        type: 'string',
        label: 'jobTitle',

        placeholder: '',
      },
      industry: {
        type: 'string',
        label: 'industry',

        placeholder: '',
      },
      patronus: {
        type: 'enumerator',
        label: 'patronus',

        placeholder: 'a,b,c,d,e',
        options: ['a', 'b', 'c', 'd', 'e'],
      },
      potions: {
        type: 'decimal',
        label: 'potions',

        placeholder: '',
      },
      charms: {
        type: 'string',
        label: 'charms',

        placeholder: '',
      },
      dada: {
        type: 'string',
        label: 'dada',

        placeholder: '',
      },
      sex: {
        type: 'string',
        label: 'sex',

        placeholder: '',
      },
      avatarUrl: {
        type: 'string',
        label: 'avatarUrl',

        placeholder: '',
      },
      topSpells: {
        type: 'enumeratorMulti',
        label: 'topSpells',

        placeholder:
          'jinxes, hexes, charms, curses, spells, counters, healing, transfigurations',
        options: [
          'charms',
          'counters',
          'curses',
          'healing',
          'hexes',
          'spells',
          'transfigurations',
          'jinxes',
        ],
      },
      bookAppearances: {
        type: 'enumerator',
        label: 'bookAppearances',

        placeholder: '1,2,3,4,5,6,7,8',
        options: ['1', '2', '3', '4', '5', '6', '7', '8'],
      },
      house: {
        type: 'enumerator',
        label: 'house',

        placeholder: '',
        options: [
          'hufflepuff',
          'ravenclaw',
          'slytherin',
          'unknown',
          'gryffindor',
        ],
      },
    },
    foos: {
      fooBoolean: {
        type: 'boolean',
        label: 'Foo Boolean',

        placeholder: 'foo boolean placeholder',
      },
      fooString: {
        type: 'string',
        label: 'Foo String',

        placeholder: 'foo string placeholder',
      },
      fooText: {
        type: 'text',
        label: 'Foo Text',

        placeholder: 'foo text placeholder',
      },
      fooInteger: {
        type: 'integer',
        label: 'Foo Integer',

        placeholder: 'foo integer placeholder',
      },
      fooDecimal: {
        type: 'decimal',
        label: 'Foo Decimal',

        placeholder: 'foo decimal placeholder',
      },
      fooDate: {
        type: 'date',
        label: 'Foo Date',

        placeholder: 'foo date placeholder',
      },
      fooDateTime: {
        type: 'dateTime',
        label: 'Foo Date Time',

        placeholder: 'foo datetime placeholder',
      },
      fooArray: {
        type: 'array',
        label: 'Foo Array',

        placeholder: 'foo array placeholder',
      },
      fooMap: {
        type: 'map',
        label: 'Foo Map',

        placeholder: 'foo map placeholder',
      },
      fooEnumerator: {
        type: 'enumerator',
        label: 'Foo Enumerator',

        placeholder: 'a,b,c,',
        options: ['a', 'b', 'c'],
      },
      foodEnumeratorMulti: {
        type: 'enumeratorMulti',
        label: 'Foo Enum Multi',

        placeholder: 'a,b,c',
        options: ['a', 'b', 'c'],
      },
      fooOTM: {
        type: 'relation',
        label: 'Foo OTM',
        relation: 'otm',
        placeholder: 'one-to-many',
      },
      fooMTO: {
        type: 'relation',
        label: 'Foo MTO',
        relation: 'mto',
        placeholder: 'many-to-one',
      },
      fooOTO: {
        type: 'relation',
        label: 'Foo OTO',
        relation: 'oto',
        placeholder: 'one-to-one',
      },
      fooMTM: {
        type: 'relation',
        label: 'Foo MTM',
        relation: 'mtm',
        placeholder: 'many-to-many',
      },
    },
  }
}
