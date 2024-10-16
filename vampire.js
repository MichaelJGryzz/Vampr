class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no creator is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampire1 = this;
    let vampire2 = vampire;

    // Step 1: Align both vampires at the same level in the tree using numberOfVampiresFromOriginal function
    let distance1 = this.numberOfVampiresFromOriginal;
    let distance2 = vampire.numberOfVampiresFromOriginal;

    while (distance1 > distance2) {
      vampire1 = vampire1.creator;
      distance1--;
    }

    while (distance2 > distance1) {
      vampire2 = vampire2.creator;
      distance2--;
    }

    // Step 2: Climb up together until we find a common ancestor
    while (vampire1 !== vampire2) {
      vampire1 = vampire1.creator;
      vampire2 = vampire2.creator;
    }

    return vampire1;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // Check if this vampire's name matches the given name
    if (this.name === name) {
      // Return this vampire if the name matches
      return this;
    }

    // Iterate through each descendant to search for the vampire
    for (const descendent of this.offspring) {
      // Recursively search in descendants
      const foundVampire = descendent.vampireWithName(name);
      if (foundVampire) {
        // Return the found vampire if found
        return foundVampire;
      }
    }

    // Return null if no matching vampire is found in this subtree
    return null;
  }
  
  // Returns the total number of vampires that exist
  get totalDescendents() {
    // Start with zero vampires
    let totalDescendents = 0;

    // Count the direct offspring
    totalDescendents += this.numberOfOffspring;

    // Use depth-first traversal to count all the offsprings
    for (const descendent of this.offspring) {
      // Recursively count descendents and add to total
      totalDescendents += descendent.totalDescendents;
    }

    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    // Initialize an empty array
    let millennialVampires = [];

    // Check if this vampire was converted after 1980
    if(this.yearConverted > 1980) {
      millennialVampires.push(this);
    }

    // Iterate through each offspring to check the year converted
    for (const descendent of this.offspring) {
      // Recursively gather millenial vampires from each descendent
      millennialVampires = millennialVampires.concat(descendent.allMillennialVampires);
    }

    return millennialVampires;
  }
}

module.exports = Vampire;

