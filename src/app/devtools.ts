if (import.meta.env.DEV) {
  const { connectLogger } = await import('@reatom/core')

  connectLogger()
}
