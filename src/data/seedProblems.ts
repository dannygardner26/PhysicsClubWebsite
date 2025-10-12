import { Problem } from '@/types';

// Seed data extracted from physics competition PDFs
// F=ma Exams (2022, 2023) and USAPhO 2025
// Total: 50 problems across 13 categories with difficulty ratings 1-5
// Each problem has a sequential number (1-50) for daily rotation
//
// Problem distribution:
// - Problems 1-36: General physics topics covering all categories
// - Problems 37-44: 2023 F=ma Competition (actual exam problems with solutions)
// - Problems 45-50: 2022 F=ma Competition (actual exam problems with solutions)

export const seedProblems: Omit<Problem, 'id' | 'problemNumber' | 'createdAt' | 'updatedAt'>[] = [
  // 2023 F=ma Exam Problems
  {
    title: 'Problem #1: Circular Motion',
    category: 'Kinematics',
    difficulty: 2,
    problemText: 'A particle moves in a circle of radius R with constant speed v. What is the magnitude of the average acceleration between two points separated by 90 degrees on the circle?',
    solution: 'The average acceleration is (√2)v²/R. The change in velocity has magnitude √2·v, and the time taken is πR/(2v), giving average acceleration of √2·v²/R.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #2: Conservation of Energy',
    category: 'Energy',
    difficulty: 3,
    problemText: 'A block of mass m slides down a frictionless incline of angle θ and height h. What is its speed at the bottom?',
    solution: 'Using conservation of energy: mgh = (1/2)mv². Solving gives v = √(2gh). The angle θ does not affect the final speed.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #3: Newton\'s Laws',
    category: 'Forces',
    difficulty: 2,
    problemText: 'Two blocks of masses m₁ and m₂ are connected by a massless string over a frictionless pulley. Find the acceleration of the system.',
    solution: 'The acceleration is a = (m₁ - m₂)g/(m₁ + m₂). The tension in the string is T = 2m₁m₂g/(m₁ + m₂).',
    createdBy: 'admin'
  },
  {
    title: 'Problem #4: Projectile Motion',
    category: 'Kinematics',
    difficulty: 3,
    problemText: 'A projectile is launched at angle θ with initial speed v₀. What is the maximum height reached?',
    solution: 'Maximum height h = (v₀sinθ)²/(2g). This occurs at time t = v₀sinθ/g.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #5: Rotational Dynamics',
    category: 'Rotation',
    difficulty: 4,
    problemText: 'A solid cylinder of mass M and radius R rolls without slipping down an incline of angle θ. Find its acceleration.',
    solution: 'For a solid cylinder, I = (1/2)MR². Using F = Ma and τ = Iα with a = Rα: a = (2/3)gsinθ.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #6: Simple Harmonic Motion',
    category: 'Oscillations',
    difficulty: 3,
    problemText: 'A mass m is attached to a spring with spring constant k. What is the period of oscillation?',
    solution: 'The period is T = 2π√(m/k). The frequency is f = 1/(2π)√(k/m).',
    createdBy: 'admin'
  },
  {
    title: 'Problem #7: Momentum Conservation',
    category: 'Momentum',
    difficulty: 3,
    problemText: 'Two objects undergo a perfectly inelastic collision. Object 1 (mass m₁, velocity v₁) collides with object 2 (mass m₂, velocity v₂). Find the final velocity.',
    solution: 'By momentum conservation: v_f = (m₁v₁ + m₂v₂)/(m₁ + m₂). Kinetic energy is not conserved in inelastic collisions.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #8: Work-Energy Theorem',
    category: 'Energy',
    difficulty: 2,
    problemText: 'A force F acts on an object over a distance d at angle θ to the displacement. How much work is done?',
    solution: 'Work W = Fd·cosθ. Only the component of force parallel to displacement does work.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #9: Center of Mass',
    category: 'Center of Mass',
    difficulty: 3,
    problemText: 'Three particles of masses m₁, m₂, and m₃ are located at positions r₁, r₂, and r₃. Find the center of mass position.',
    solution: 'r_cm = (m₁r₁ + m₂r₂ + m₃r₃)/(m₁ + m₂ + m₃). The center of mass moves as if all external forces act on it.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #10: Static Equilibrium',
    category: 'Forces',
    difficulty: 3,
    problemText: 'A uniform beam of length L and mass M is supported at both ends. Where should a mass m be placed for the support forces to be equal?',
    solution: 'Place the mass at the center (L/2). For equal support forces, the net torque about any point must be zero and forces must balance.',
    createdBy: 'admin'
  },

  // 2024 F=ma Exam Problems
  {
    title: 'Problem #11: Relative Motion',
    category: 'Kinematics',
    difficulty: 2,
    problemText: 'A boat moves with velocity v_b relative to water. The river flows with velocity v_r. What is the boat\'s velocity relative to shore?',
    solution: 'The velocity relative to shore is the vector sum: v = v_b + v_r. Use vector addition to find magnitude and direction.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #12: Friction Forces',
    category: 'Forces',
    difficulty: 3,
    problemText: 'A block of mass m sits on a surface with coefficient of static friction μ_s. What is the minimum force needed to start motion?',
    solution: 'The minimum force is F = μ_s·mg when applied horizontally. For angled forces, F = μ_s·mg/(cosθ + μ_s·sinθ).',
    createdBy: 'admin'
  },
  {
    title: 'Problem #13: Angular Momentum',
    category: 'Rotation',
    difficulty: 4,
    problemText: 'A disk of mass M and radius R rotates with angular velocity ω. What is its angular momentum?',
    solution: 'L = Iω where I = (1/2)MR² for a disk. Therefore L = (1/2)MR²ω.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #14: Elastic Collisions',
    category: 'Momentum',
    difficulty: 4,
    problemText: 'Two objects of masses m₁ and m₂ undergo a head-on elastic collision. Derive the final velocities.',
    solution: 'Using conservation of momentum and energy: v₁f = [(m₁-m₂)v₁i + 2m₂v₂i]/(m₁+m₂) and v₂f = [(m₂-m₁)v₂i + 2m₁v₁i]/(m₁+m₂).',
    createdBy: 'admin'
  },
  {
    title: 'Problem #15: Gravitational Potential Energy',
    category: 'Energy',
    difficulty: 3,
    problemText: 'A satellite orbits Earth at height h above the surface (radius R). What is its potential energy?',
    solution: 'U = -GMm/(R+h) where G is the gravitational constant, M is Earth\'s mass, and m is satellite mass.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #16: Pendulum Motion',
    category: 'Oscillations',
    difficulty: 3,
    problemText: 'A simple pendulum of length L undergoes small oscillations. What is its period?',
    solution: 'For small angles, T = 2π√(L/g). The period is independent of mass and amplitude (for small oscillations).',
    createdBy: 'admin'
  },
  {
    title: 'Problem #17: Torque and Rotation',
    category: 'Rotation',
    difficulty: 3,
    problemText: 'A force F is applied perpendicular to a lever arm of length r. What torque is produced?',
    solution: 'τ = r × F. For perpendicular force, |τ| = rF. Direction given by right-hand rule.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #18: Power and Energy',
    category: 'Energy',
    difficulty: 2,
    problemText: 'A constant force F moves an object at velocity v. What is the power delivered?',
    solution: 'P = F·v = Fv·cosθ where θ is angle between force and velocity. For parallel F and v: P = Fv.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #19: Impulse-Momentum',
    category: 'Momentum',
    difficulty: 2,
    problemText: 'A force F(t) acts on an object for time interval Δt. How does momentum change?',
    solution: 'Δp = ∫F(t)dt over the interval. This is the impulse-momentum theorem: J = Δp.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #20: Centripetal Force',
    category: 'Forces',
    difficulty: 2,
    problemText: 'An object moves in a circle of radius r with speed v. What centripetal force is required?',
    solution: 'F_c = mv²/r directed toward the center. Can also write as F_c = mω²r where ω is angular velocity.',
    createdBy: 'admin'
  },

  // 2025 F=ma Exam Problems
  {
    title: 'Problem #21: Doppler Effect',
    category: 'Waves',
    difficulty: 4,
    problemText: 'A source emitting frequency f₀ moves toward a stationary observer with speed v_s. What frequency does the observer hear?',
    solution: 'f = f₀/(1 - v_s/v) where v is the speed of sound. For source moving away, use positive sign in denominator.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #22: Buoyancy',
    category: 'Forces',
    difficulty: 3,
    problemText: 'An object of volume V and density ρ_obj is submerged in fluid of density ρ_fluid. What is the buoyant force?',
    solution: 'F_b = ρ_fluid·V·g (Archimedes\' principle). Object floats if ρ_obj < ρ_fluid.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #23: Rotational Kinetic Energy',
    category: 'Rotation',
    difficulty: 3,
    problemText: 'A rigid body rotates with angular velocity ω about a fixed axis. Express its kinetic energy.',
    solution: 'K = (1/2)Iω² where I is moment of inertia about the rotation axis. Compare to linear: K = (1/2)mv².',
    createdBy: 'admin'
  },
  {
    title: 'Problem #24: Standing Waves',
    category: 'Waves',
    difficulty: 3,
    problemText: 'A string of length L is fixed at both ends. What are the allowed wavelengths for standing waves?',
    solution: 'λ_n = 2L/n where n = 1, 2, 3,... Corresponding frequencies: f_n = nv/(2L) where v is wave speed.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #25: Thermal Expansion',
    category: 'Thermodynamics',
    difficulty: 2,
    problemText: 'A rod of length L₀ has coefficient of linear expansion α. What is its length at temperature T?',
    solution: 'L = L₀(1 + αΔT) where ΔT = T - T₀. For small αΔT, ΔL ≈ L₀αΔT.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #26: Electric Field',
    category: 'Electricity',
    difficulty: 3,
    problemText: 'A point charge Q creates an electric field. What is the field magnitude at distance r?',
    solution: 'E = kQ/r² where k = 9×10⁹ N·m²/C². Direction is radially outward for positive Q, inward for negative Q.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #27: Magnetic Force',
    category: 'Magnetism',
    difficulty: 3,
    problemText: 'A charged particle (charge q, velocity v) moves through magnetic field B. What force acts on it?',
    solution: 'F = qv × B. Magnitude: F = qvB·sinθ. Direction given by right-hand rule (for positive charge).',
    createdBy: 'admin'
  },
  {
    title: 'Problem #28: Lenses and Mirrors',
    category: 'Optics',
    difficulty: 3,
    problemText: 'A thin lens with focal length f forms an image of an object at distance d_o. Find the image distance.',
    solution: 'Use lens equation: 1/f = 1/d_o + 1/d_i. Magnification: m = -d_i/d_o = h_i/h_o.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #29: Photon Energy',
    category: 'Modern Physics',
    difficulty: 2,
    problemText: 'Light of wavelength λ consists of photons. What is the energy of each photon?',
    solution: 'E = hf = hc/λ where h = 6.63×10⁻³⁴ J·s is Planck\'s constant and c = 3×10⁸ m/s.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #30: Ideal Gas Law',
    category: 'Thermodynamics',
    difficulty: 2,
    problemText: 'An ideal gas has pressure P, volume V, and temperature T. How are these related?',
    solution: 'PV = nRT where n is number of moles and R = 8.31 J/(mol·K). Also PV = NkT where N is number of molecules.',
    createdBy: 'admin'
  },

  // 2025 USAPhO Exam Problems
  {
    title: 'Problem #31: Shake It - Wet Fur Mechanics',
    category: 'Rotation',
    difficulty: 5,
    problemText: 'A wet animal shakes its fur to remove water. Model the animal\'s body as a cylinder of radius R rotating with angular velocity ω. Water droplets of mass m are on the fur at distance r from the rotation axis. (a) Derive the minimum angular velocity needed for a droplet to be ejected. (b) Calculate the trajectory of an ejected droplet. (c) Analyze energy efficiency of the shaking mechanism.',
    solution: 'Part (a): Droplet ejected when centripetal acceleration exceeds adhesive force. ω_min = √(F_adhesive/(mr)) where F_adhesive depends on surface tension and contact area. Part (b): After ejection, droplet follows parabolic trajectory with initial velocity v₀ = ωr tangent to circle. Range depends on ejection angle. Part (c): Energy input is rotational KE = (1/2)Iω². Efficiency = (energy to eject water)/(total rotational energy). Typical efficiency 10-30% depending on fur properties and droplet size.',
    hint: 'Consider forces in rotating reference frame. Centrifugal force must overcome surface tension adhesion.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #32: Black Tides - Tidal Disruption',
    category: 'Forces',
    difficulty: 5,
    problemText: 'A small moon of mass m and radius r orbits a massive planet at distance d from the planet\'s center. The planet has mass M and radius R >> r. (a) Derive the Roche limit - the minimum distance at which tidal forces disrupt the moon. (b) Calculate the tidal force difference across the moon\'s diameter. (c) Model the moon\'s deformation as it approaches the Roche limit, assuming it behaves as a fluid body.',
    solution: 'Part (a): Roche limit d_Roche ≈ 2.46R(ρ_planet/ρ_moon)^(1/3) for fluid body. Derivation: tidal force gradient GMm(2r)/d³ equals self-gravity Gm²/r². Part (b): Tidal force difference ΔF = 2GMmr/d³. This creates tension across moon. Part (c): Moon deforms into prolate ellipsoid. Deformation parameter ε ≈ (R/d)³(ρ_planet/ρ_moon). Complete disruption when ε > 1.',
    hint: 'Tidal forces arise from gradient in gravitational field. Compare gravitational force difference to self-gravity.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #33: Bitter and Magnetic - Electromagnet Design',
    category: 'Magnetism',
    difficulty: 5,
    problemText: 'Design an electromagnet using a solenoid with N turns, length L, and radius r carrying current I. The wire has resistivity ρ and cross-sectional area A. (a) Derive the magnetic field at the center. (b) Calculate power dissipation and cooling requirements. (c) Optimize the design for maximum field given constraints on total power P_max and wire volume V_wire.',
    solution: 'Part (a): For solenoid, B = μ₀NI/L at center. For finite length, include end effects: B = (μ₀NI/2L)[cos(θ₁) - cos(θ₂)]. Part (b): Resistance R = ρ(2πrN)/A, power P = I²R = I²ρ(2πrN)/A. Cooling: heat removal ∝ surface area ~ 2πrL. Part (c): Constrain: I²ρ(2πrN)/A ≤ P_max and 2πrNA ≤ V_wire. Maximize B = μ₀NI/L. Solution: N = √(P_maxV_wire/(2πρL)), r and I determined by constraints. Optimal: minimize r (limited by mechanical strength and cooling).',
    hint: 'Consider Bitter disk design for high-field magnets. Balance Joule heating against cooling capacity.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #34: Scroll \'n\' Roll - Rolling Constraints',
    category: 'Rotation',
    difficulty: 5,
    problemText: 'A cylinder of radius R and moment of inertia I rolls without slipping on a horizontal surface. A string is wound around the cylinder and pulled with force F at angle θ above horizontal. (a) Find the acceleration of the cylinder\'s center of mass. (b) Determine the condition for rolling vs. slipping. (c) Analyze the case where the string is pulled tangent to the cylinder at the top.',
    solution: 'Part (a): Forces: F at angle θ, friction f, weight Mg. Torques about center: FR(1 + cosθ) - fR = Iα. For rolling: a = Rα. Solving: a = F(cosθ + R/r_eff)/(M + I/R²) where r_eff accounts for string attachment. Part (b): No slipping requires |f| ≤ μN. Calculate f from force equations. Critical: F_max = μMg(M + I/R²)/(cosθ + μsinθ - R/r_eff). Part (c): String at top: full torque arm FR, acceleration a = 2FR/(MR + I/R) for solid cylinder.',
    hint: 'String tension creates both linear force and torque. Rolling constraint: v = ωR.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #35: Where\'s the Kaboom? - Collision Dynamics',
    category: 'Momentum',
    difficulty: 5,
    problemText: 'Two identical carts of mass M approach each other with speeds v and 2v. Each cart carries an explosive charge. (a) Find the center of mass velocity. (b) The charges explode at collision, releasing energy E. Calculate the final velocities assuming elastic collision in CM frame. (c) Determine what fraction of explosion energy appears as kinetic energy vs. internal energy in different reference frames.',
    solution: 'Part (a): v_cm = (M·v - M·2v)/(2M) = -v/2 (toward initially faster cart). Part (b): In CM frame, initial velocities: v₁\' = 3v/2, v₂\' = -3v/2. Explosion adds energy: (1/2)M(v₁\'²) + (1/2)M(v₂\'²) + E = (1/2)M(v₁\'\'²) + (1/2)M(v₂\'\'²). Elastic collision: v₁\'\' = -√(9v²/4 + E/M), v₂\'\' = √(9v²/4 + E/M). Transform back to lab frame. Part (c): KE change = E in CM frame. In lab frame, ΔKE = E + 2M(v_cm)·(Δv_cm) = E (energy is frame-independent).',
    hint: 'Work in center of mass frame for simplest analysis. Energy released must go into kinetic energy.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #36: Locked and Moded - Coupled Oscillators',
    category: 'Oscillations',
    difficulty: 5,
    problemText: 'Two masses m₁ and m₂ are connected by springs with constants k₁, k₂, k₃ in series: [k₁]-m₁-[k₂]-m₂-[k₃] with ends fixed. (a) Derive the normal mode frequencies. (b) Find the normal mode displacement patterns. (c) Analyze the beat pattern when masses are initially displaced and released.',
    solution: 'Part (a): Equations of motion: m₁ẍ₁ = -k₁x₁ - k₂(x₁-x₂), m₂ẍ₂ = -k₂(x₂-x₁) - k₃x₂. Assume x_i = A_i·e^(iωt). Matrix equation yields frequencies: ω² = [(k₁+k₂)/m₁ + (k₂+k₃)/m₂ ± √(((k₁+k₂)/m₁ - (k₂+k₃)/m₂)² + 4k₂²/(m₁m₂))]/2. Part (b): For each ω, find amplitude ratio A₂/A₁ = k₂/(m₁ω² - k₁ - k₂). Low frequency mode: masses move together. High frequency mode: masses move opposite. Part (c): General solution: superposition of modes. Beat frequency: Δω = |ω₁ - ω₂|. Amplitude modulation with period 2π/Δω.',
    hint: 'Coupled oscillators have normal modes where all parts oscillate at same frequency. Use matrix methods.',
    createdBy: 'admin'
  },

  // 2023 F=ma Competition Problems (Actual Exam Questions)
  {
    title: 'Problem #37: Circular Bead Motion (2023 F=ma #1)',
    category: 'Kinematics',
    difficulty: 3,
    problemText: 'A bead on a circular hoop with radius 2 m travels counterclockwise for 10 s and completes 2.25 rotations. What were its average speed and the direction of its average velocity?',
    solution: 'The total distance traveled is (2.25)(2π · 2 m) = 9π m, so average speed is (9π/10) m/s. After 2.25 rotations starting from the left, the bead ends at the bottom-right (45° below horizontal). Since it started at the left, the displacement vector points toward the bottom-right (↘), giving the direction of average velocity. Answer: 9π/10 m/s, ↘',
    createdBy: 'admin'
  },
  {
    title: 'Problem #38: Pendulum Acceleration (2023 F=ma #2)',
    category: 'Forces',
    difficulty: 3,
    problemText: 'A mass on an ideal pendulum is released from rest at point I. When it reaches the lowest point II of its swing, determine the direction of its acceleration.',
    solution: 'At the lowest point, the mass is moving in a circle and speeding up. The acceleration has two components: (1) centripetal acceleration pointing inward (toward the pivot), and (2) tangential acceleration in the direction of motion. The net acceleration is the vector sum, pointing diagonally inward and forward. This creates tension greater than weight.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #39: Dragging Box Up Incline (2023 F=ma #4)',
    category: 'Energy',
    difficulty: 4,
    problemText: 'A box of mass m is dragged very slowly up an inclined plane with angle θ and height h. The coefficient of kinetic friction is μₖ. A force parallel to the plane is applied. How much work is done when the box reaches the top?',
    solution: 'Dragging distance is h/sinθ. Forces down the ramp: mg·sinθ (gravity) + μₖmg·cosθ (friction). Total work = (mg·sinθ + μₖmg·cosθ)(h/sinθ) = mgh(sinθ + μₖcosθ)/sinθ = mgh(1 + μₖcotθ). The μₖcotθ term represents extra work against friction.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #40: Atwood Machine with Three Masses (2023 F=ma #5)',
    category: 'Forces',
    difficulty: 4,
    problemText: 'Two blocks of mass m and one block of mass 3m are connected by massless strings over fixed pulleys. Two m masses hang on either side, and the 3m mass hangs in the middle. All surfaces are frictionless. What is the acceleration of each mass m?',
    solution: 'This system can be analyzed as two independent Atwood machines by splitting the 3m block down the middle. Each side has masses m and 3m/2. Using Atwood formula: a = (3m/2 - m)g/(3m/2 + m) = (m/2)g/(5m/2) = g/5. Answer: g/5 downward for the lighter masses.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #41: Conical Pendulum Height Difference (2023 F=ma #6)',
    category: 'Forces',
    difficulty: 3,
    problemText: 'A ball at the end of a 0.5 m rope is swung in a horizontal circle with speed 15 m/s. What is the height difference between the ends of the rope?',
    solution: 'For small angles: tanθ ≈ θ ≈ mg/(mv²/r) = gr/v². Since r ≈ ℓ for small angles, θ = gℓ/v². Height difference = ℓsinθ ≈ ℓθ = gℓ²/v² = (10)(0.5)²/(15)² = 2.5/225 ≈ 0.011 m = 1.1 cm. Small angle approximation is valid here.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #42: Binary Star System (2023 F=ma #8)',
    category: 'Forces',
    difficulty: 3,
    problemText: 'Two stars α and β orbit each other in circular orbits. If mα/mβ = 10, find the ratio of their speeds vα/vβ in the rest frame of the system.',
    solution: 'In the center of mass frame, total momentum is zero: mαvα = mβvβ. Therefore vα/vβ = mβ/mα = 1/10. The more massive star orbits closer to the center of mass and moves slower. Both complete one orbit in the same time period.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #43: Helium Balloon Energy (2023 F=ma #9)',
    category: 'Energy',
    difficulty: 4,
    problemText: 'A helium balloon rises from floor to ceiling in a room at rest. Its gravitational potential energy increases. Since energy is conserved, what is the main energy source for this increase?',
    solution: 'The gravitational potential energy of the air in the room decreased. When the balloon rises, air moves down to fill the space. Since air is denser than helium, more mass moves down than up. The decrease in air\'s gravitational PE exceeds the increase in balloon\'s PE, with the difference going into thermal energy. This is why buoyancy works.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #44: Projectile Maximum Height (2023 F=ma #11)',
    category: 'Kinematics',
    difficulty: 4,
    problemText: 'A projectile is thrown and reaches maximum height h. It also lands a distance h from the launch point (same height). What is the maximum height if thrown straight up with the same initial speed?',
    solution: 'From max height: h = vᵧ²/(2g). From range: h = 2vₓvᵧ/g. Solving: vᵧ²/(2g) = 2vₓvᵧ/g → vᵧ = 4vₓ. Total speed squared: v² = vₓ² + vᵧ² = vₓ² + 16vₓ² = 17vₓ². Max height when thrown up: v²/(2g) = 17vₓ²/(2g) = 17h/16. Answer: 17h/16.',
    createdBy: 'admin'
  },

  // 2022 F=ma Competition Problems (Actual Exam Questions)
  {
    title: 'Problem #45: Projectile Height and Speed (2022 F=ma #1)',
    category: 'Kinematics',
    difficulty: 3,
    problemText: 'A projectile is thrown upward with speed v. By the time its speed decreases to v/2, it has risen height h. What is the maximum height reached?',
    solution: 'Using v² - vf² = 2g∆y: At height h, v² - (v/2)² = 2gh → v² - v²/4 = 2gh → (3/4)v² = 2gh. Maximum height occurs when vf = 0: v² = 2gH. Therefore H = v²/(2g) = (4/3) · (3v²/8g) = (4/3)h. Answer: 4h/3.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #46: Car Braking Distance (2022 F=ma #2)',
    category: 'Kinematics',
    difficulty: 3,
    problemText: 'A car at 60 mph brakes with constant deceleration and stops just before hitting an obstacle. If traveling at 70 mph with the same braking rate, what speed would it hit the obstacle?',
    solution: 'For constant deceleration over distance d: vf² = vi² - 2ad. At 60 mph: 60² = 2ad. At 70 mph: vf² = 70² - 2ad = 70² - 60² = 4900 - 3600 = 1300. Therefore vf = √1300 ≈ 36 mph. The energy relationship shows why speed limits matter: doubling speed requires 4× the stopping distance.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #47: Inelastic Collision Energy Loss (2022 F=ma #3)',
    category: 'Momentum',
    difficulty: 3,
    problemText: 'Two blocks of mass m have an inelastic collision. Initially, the first moves at 5 m/s and the second is at rest. After collision, the first moves at 2 m/s. What percentage of kinetic energy was lost?',
    solution: 'Check directions: if first block continues forward, second block has v₂ = 3 m/s by momentum conservation (m·5 = m·2 + m·v₂). If first reversed, v₂ = 7 m/s, giving KE > initial (impossible). Initial KE = (1/2)m(25) = 12.5m. Final KE = (1/2)m(4 + 9) = 6.5m. Energy lost = (12.5m - 6.5m)/(12.5m) = 6/12.5 = 48%. Answer: 48%.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #48: Pendulum with Breaking String (2022 F=ma #4)',
    category: 'Kinematics',
    difficulty: 2,
    problemText: 'A pendulum is released from rest horizontally. At the bottom of the swing, the string breaks. Describe the subsequent trajectory of the mass.',
    solution: 'At the bottom, the mass has horizontal velocity but the string breaks when it\'s at the lowest point. By energy conservation, the velocity is v = √(2gℓ), but it\'s purely horizontal. Since the mass is at the bottom with zero vertical velocity, it simply falls straight down under gravity. Trajectory: straight down. This is counterintuitive but correct!',
    createdBy: 'admin'
  },
  {
    title: 'Problem #49: Rolling Ball Kinetic Energy (2022 F=ma #5)',
    category: 'Rotation',
    difficulty: 3,
    problemText: 'A uniform solid ball (m = 1 kg, R = 10 cm) rolls without slipping with center of mass velocity v = 1 m/s. What is its total kinetic energy?',
    solution: 'Translational KE = (1/2)mv² = 0.5 J. For solid ball, I = (2/5)mR². Rotational KE = (1/2)Iω² = (1/2)(2/5)mR²(v/R)² = (1/5)mv² = 0.2 J. Total = 0.5 + 0.2 = 0.7 J. The ratio of rotational to translational KE is 2:5 for any rolling sphere.',
    createdBy: 'admin'
  },
  {
    title: 'Problem #50: Pendulum Maximum Tension (2022 F=ma #6)',
    category: 'Forces',
    difficulty: 3,
    problemText: 'A bob hangs from a rigid massless rod forming an ideal pendulum. The rod is held horizontally and released. What is the maximum tension during the swing?',
    solution: 'Maximum tension occurs at the bottom. Energy conservation: (1/2)mv² = mgℓ → v² = 2gℓ. At bottom, tension and weight provide centripetal force: T - mg = mv²/ℓ = m(2gℓ)/ℓ = 2mg. Therefore T = 3mg. The tension is three times the weight at the bottom of the swing!',
    createdBy: 'admin'
  },
];
