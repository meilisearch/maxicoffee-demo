
export async function watchTasks (client, uid) {
  console.log(`Start update watch for ${uid}`)
  console.log('-------------')
  try {
    const tasks = await client.index(uid).getTasks()
    console.log(`${uid} index: changing settings`)
    console.log('-------------')
    await client.index(uid).waitForTasks(tasks)
    console.log(`All settings changed to "${uid}"`)
  } catch (e) {
    console.error(e)
  }
}
