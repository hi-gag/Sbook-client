export const mockInsight = {
  bookmarkListId: 11,
  keywords: [
    "프론트엔드",
    "개발",
  ],
  relatedUrl: [{
    keyword: "프론트엔드",
    urls: [
        {
          id: 1,
          title: '대학 졸업 직전 프론트엔드 개발자 구직 회고',
          description: '구직기입니다',
          img: 'https://maxkim-j.github.io/uploads/default.png',
          url: 'https://maxkim-j.github.io/posts/job-searching-retrospect',
          keywords: ['구직', '회고', '대학생'],
          createdAt: '2022-04-21',
          importance: 5,
          memo: '이거 꼭 보세요',
        },
        {
          id: 2,
          title: '웹 접근성 준수가 가져오는 프론트엔드 개발의 이점',
          description: '멋진 북마크입니다22',
          img: '',
          url: 'https://maxkim-j.github.io/posts/web-accessiblity-virtuous-cycle',
          keywords: ['RTL', '웹 접근성', '프론트엔드'],
          createdAt: '2022-04-20',
          importance: 2,
          memo: '메모입니다',
        },
      ],
    },
    {
      keyword: "개발",
      urls: [
          {
            id: 1,
            title: 'SonarLint와 SonarCloud 연동하기 (WebStorm Plugin)',
            description:
              '지난 시간에 프로젝트와 SonarCloud 연동을 했습니다. 이번 시간에는 프로젝트와 연결된 SonarCloud를 개발환경인 WebStorm의 SonarLint 플러그인과 연동해서 IDE로 개발 중에도 SonarCloud 검증이 되도록 설정해..',
            img: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcW9GuD%2FbtrzjY2nAWV%2Fx6KxxJyIlM6QpGLb20qnp0%2Fimg.png',
            url: 'https://jojoldu.tistory.com/665?category=1036934',
            keywords: ['SonarLint', 'SonarCloud', 'Webstorm'],
            createdAt: '2022-04-21',
            importance: 3,
            memo: '이거 꼭 보세요',
          },
          {
            id: 2,
            title: 'expect에서 false와 falsy 구분하기',
            description:
              'Jest로 테스트 코드를 작성하다보면 습관적으로 IDE의 자동완성으로 toBeFalsy 와 toBeTruthy 를 사용하곤 했다. 저 둘이 아닌 toBe(false) 와 toBe(true) 는 한 번의 자동완성으로 안되기 때문에 굳이 사용하진..',
            img: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdvHRaH%2Fbtrzgh76INX%2FkcMBLlTtKDRUB2eo6BYzTK%2Fimg.png',
            url: 'https://jojoldu.tistory.com/664?category=1036934',
            keywords: ['Jest', '테스트', 'TDD'],
            createdAt: '2022-04-20',
            importance: 2,
            memo: '메모입니다',
          },
        ],
      },
  ]
};
