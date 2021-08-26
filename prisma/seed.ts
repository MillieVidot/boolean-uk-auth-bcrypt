// import dbClient from "../src/utils/database"
// import { User } from ".prisma/client"

// const users: User[] = [
//   {
//     username: "CamillaV",
//     password: "test",
//     bio: "Blah blah",
//     role: "User",
//   },
//   {
//     username: "Jonathon",
//     password: "test",
//     bio: "Blah blah blah",
//     role: "User",
//   },
//   {
//     username: "Sergio",
//     password: "test",
//     bio: "Blah blah blah",
//     role: "Admin",
//   },
// ]

// export async function seed() {
//   const newUsers = await users.map(user => {
//     dbClient.user.create({
//       data: user,
//     })
//   })
// }

// seed()
//   .catch(e => console.error(e))
//   .finally(() => dbClient.$disconnect())
