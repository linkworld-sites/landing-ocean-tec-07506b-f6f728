---
title: "From Thermal Failure to Series Production: Custom BLDC Controller for Maritime Propulsion"
date: 2026-06-25
description: How Ocean Tec engineered a custom BLDC motor controller for a European maritime propulsion OEM — resolving thermal and integration failures that had blocked production for eight months, delivering an 18% efficiency gain and CE-certified series parts within six months.
keywords: custom BMS development Austria, battery pack manufacturer Europe, maritime propulsion electronics, BLDC motor controller, PCBA development, embedded firmware, FOC control
---

## The brief that arrived in two sentences

"Our off-the-shelf controller keeps failing in the housing. We've been blocked for eight months."

That was the opener from the engineering lead at a mid-sized European OEM developing a subsea thruster unit for commercial ROV applications. The project was not experimental — they had a contract, a customer, and a deadline that had already slipped twice. What they needed was not a faster supplier. They needed a different engineering approach.

This is a project we have been permitted to describe. The customer's name remains confidential at their request; the technical detail is accurate.

---

## The challenge: where off-the-shelf stops

The customer's original design used a commercially available FOC (field-oriented control) module — a capable part in its intended context. In their application, three failure modes appeared within a few hundred hours of operational testing:

**Thermal accumulation in a sealed enclosure.** The original controller was designed for ventilated or liquid-cooled installations. Mounted inside an IP68-rated titanium housing with no convective path, junction temperatures at peak thrust rose past the manufacturer's derated limit. The module would enter thermal protection and cut thrust mid-dive — the worst possible failure mode for a tethered ROV.

**CAN interface incompatibility.** The customer's vehicle control architecture used a custom CANopen profile. The off-the-shelf module exposed a different object dictionary and had no published firmware source, making adaptation impossible without replacing the part entirely.

**Size and mass constraint.** The housing geometry was fixed by hydrodynamic requirements. The commercial module, with its through-hole power stage and external gate driver IC, exceeded the available PCB envelope by 24 mm in one axis — too large to reroute without reworking the mechanical design.

The combination of all three constraints left the customer at an impasse. Modifying the housing would invalidate six months of CFD and structural qualification work. Replacing the controller meant building custom — a path they had neither the team nor the timeline to pursue internally.

---

## The Ocean Tec engineering approach

We began with a two-day technical review at the customer's facility — reviewing the existing hardware design, the CAN architecture specification, the housing thermal model, and the qualification test reports that had already been completed.

The outcome of that review shaped the entire development: rather than designing a controller that would fit into the existing integration, we proposed co-designing the controller and the thermal interface together as a single engineering problem. The housing wall would become the heatsink. The PCB layout would be built around that constraint from the first schematic revision.

### Power stage and PCB architecture

The power stage was implemented on a six-layer PCB using a MOSFETs selected for low RDS(on) at elevated junction temperature — critically, parts whose datasheet ratings held up to the operating point rather than derated to a conservative estimate. Gate drivers were integrated into the same package as the half-bridge switches, eliminating the external IC and reclaiming 11 mm of board length.

Thermal vias were placed directly beneath the power stage and routed to a machined aluminium pad bonded to the housing inner wall with thermally conductive, electrically isolating compound. Thermal modelling during layout — validated against the customer's existing housing FEA — confirmed junction-to-ambient resistance would stay below the threshold required to sustain maximum rated current continuously at 35°C ambient water temperature.

The finished PCB fits within the available envelope with 3 mm clearance on the constrained axis.

### FOC firmware and CAN integration

Firmware was written in C for an STM32G4 series microcontroller — chosen for its floating-point unit, hardware encoder interface, and mature HAL support. The FOC algorithm runs a standard Park/Clarke transform with PI current controllers tuned to the specific motor parameters, characterised during early prototype testing.

The CANopen object dictionary was implemented to match the customer's vehicle controller specification exactly, including emergency objects, the motor status PDO layout, and the specific heartbeat timing their network manager expected. This was not a generic adaptation — we worked directly from their specification document, resolved three ambiguities in it, and built a conformance test harness that ran against their vehicle controller before integration.

OTA firmware update capability was included from the first production firmware revision, using a bootloader that validates image checksums before committing — a requirement that came out of the customer's own lessons from a previous project.

### Verification and certification

The assembled prototype boards went through in-house functional testing, followed by a qualification programme co-developed with the customer: thermal cycling, vibration to IEC 60068 profiles relevant to their platform, salt fog per IEC 60068-2-11, and EMC pre-compliance testing. CE marking was completed in collaboration with a TÜV-accredited test house in Austria.

---

## Measurable outcomes

The production controller delivered against four concrete metrics the customer had defined at project kick-off:

- **18% improvement in drive efficiency** at the thruster's primary operating point (40% maximum thrust, continuous). Measured as reduction in input power for equivalent shaft output — a direct consequence of the low-loss power stage and properly tuned FOC, versus the original module's generic parameter set.
- **40% reduction in controller mass and PCB envelope** versus the previous module, achieved without compromising current rating.
- **Zero thermal protection events** across 1,200 hours of endurance testing at rated current in the target enclosure, including a 72-hour continuous run.
- **First CE-certified serial batch delivered in 23 weeks** from project start — against the customer's eight-month prior blockage with the off-the-shelf approach.

---

## What this project illustrates

Maritime propulsion electronics occupy a narrow but demanding intersection: the thermal, mechanical, and electromagnetic environment of the sea combined with the functional safety and certification requirements of a commercial product. Off-the-shelf hardware reaches its limits here not because it is badly designed, but because it is designed for a different set of constraints.

The right response is not to force-fit a general-purpose solution. It is to build from the operating environment as the primary design constraint — a discipline that requires concurrent expertise in PCB layout, thermal engineering, embedded firmware, and the certification path.

That integration is what OCEAN TEC provides. It is the reason projects that arrive blocked tend to ship.

---

*OCEAN TEC GmbH develops and manufactures custom battery systems, propulsion electronics, and embedded solutions for maritime and industrial applications. Based in Klagenfurt, Austria, we work with OEMs and R&D teams across Europe and beyond. For technical enquiries: hello@ocean-tec.eu*
