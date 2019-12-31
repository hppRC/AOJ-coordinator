// const { client } = AOJContainer.useContainer();
// const onClick = async () => {
//   const url = `https://judgeapi.u-aizu.ac.jp/problems?size=${10000}`;
//   let res: AxiosResponse<any>;
//   try {
//     res = await client.get(url);
//   } catch (error) {
//     console.error(error);
//     return;
//   }

//   const allProblems: object[] = [];
//   const allProblemIds: string[] = [];
//   for (const problem of res.data) {
//     const { id } = problem;
//     allProblems.push(problem);
//     allProblemIds.push(id);
//   }

//   console.log(allProblems);
//   console.log(allProblemIds);

//   try {
//     await firebase
//       .firestore()
//       .collection(`AOJdata`)
//       .doc('allProblems')
//       .set({ allProblems });
//   } catch (error) {
//     console.error(error);
//   }
//   try {
//     await firebase
//       .firestore()
//       .collection(`AOJdata`)
//       .doc('allProblemIds')
//       .set({ allProblemIds });
//   } catch (error) {
//     console.error(error);
//   }
// };
