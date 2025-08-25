describe("most Likes", () => {
  const likesListWithSomeBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1",
      title: "2 Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b546234d1",
      title: "3 Go To Statement Considered Harmful",
      author: "W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b546234d1",
      title: "3 Go To Statement Considered Harmful",
      author: "Hawa Man",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
  ];
  test("When the blog of the maximum likes is found", () => {
    const result = listHelper.mostBlogs(authorListWithSomeBlogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 7 });
  });
});