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
}

module.exports = Vampire;

