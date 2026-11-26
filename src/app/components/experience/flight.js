// Steering de vuelo independiente del DOM. La posición objetivo nunca se acumula.
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi,v));
export function steer(state, target, dt, bounds) {
  const dx = target.x-state.x, dy = target.y-state.y;
  const distance = Math.hypot(dx,dy);
  const speed = Math.min(720, distance*2.8);
  const ux = distance > 0.001 ? dx/distance*speed : 0;
  const uy = distance > 0.001 ? dy/distance*speed : 0;
  const damping = 1-Math.exp(-4.2*dt);
  state.vx += (ux-state.vx)*damping;
  state.vy += (uy-state.vy)*damping;
  state.x = clamp(state.x+state.vx*dt,bounds.left,bounds.right);
  state.y = clamp(state.y+state.vy*dt,bounds.top,bounds.bottom);
  if (state.x===bounds.left || state.x===bounds.right) state.vx *= .45;
  if (state.y===bounds.top || state.y===bounds.bottom) state.vy *= .45;
  return state;
}
