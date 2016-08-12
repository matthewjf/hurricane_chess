# HurricaneChess

## Conventions
### Flux
- Actions only dispatch to stores. Any other logic needs to be provided by the calling component as a callback.

### Errors
- Not sure what to do here but right now it's a mix of callbacks (from the component), error util, and store updates. Current behavior:
  - Callbacks are used for form (post) errors
  - Error util is used for temporary errors (e.g. auth)
  - Store errors are used for more permanent issues (channels/fetches)

### Channels
- Want to move to websockets only. Right now, the initial request is handled by http, and then a channel subscription is opened. Would prefer a tree structure for websocket streams.

### Gameplay
- Don't hit the DB until after game is complete
- Would like to keep the game logic server side (inside the cable) but this may be too slow
- Maintain game state in the cable to support spectating (later)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
